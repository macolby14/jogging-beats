import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { authFetch } from "../utilities/authFetch";
import { durationFormat } from "../utilities/durationFormat";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import OauthPopup from "./OAuthPop";
import { TokenContext } from "./context/TokenProvider";
import { Heading } from "./Heading";
import { Track, TrackData } from "./Track";

/* eslint-disable camelcase */
interface Results {
  targetDuration: number; // in ms
  recommendations: {
    tracks: TrackData[];
  };
}

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const LoginButtonStyle = styled.button`
  border: 2px solid black;
  border-radius: 10px;
`;

export function BeatsResults({
  targetDuration,
  recommendations: { tracks },
}: Results) {
  const [selectedTracks, setSelectedTracks] = useState<
    Record<string, TrackData>
  >({});
  const { setUserToken, userId, userToken } = useContext(ImplicitAuthContext);
  const token = useContext(TokenContext);
  const [tempos, setTempos] = useState<Record<string, number>>({});

  useEffect(() => {
    let length = 0;
    const newSelectedTracks: typeof selectedTracks = {};

    const bufferTime = 1 * 60 * 1000; // 1 min buffer

    for (let i = 0; i < tracks.length; i += 1) {
      if (length + tracks[i].duration_ms >= targetDuration + bufferTime) {
        break;
      }
      newSelectedTracks[tracks[i].id] = tracks[i];
      length += tracks[i].duration_ms;
    }
    setSelectedTracks(newSelectedTracks);
  }, []);

  useEffect(() => {
    const ids = encodeURIComponent(tracks.map((track) => track.id).join(","));
    authFetch({
      url: `https://api.spotify.com/v1/audio-features?ids=${ids}`,
      token,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (!resp.audio_features) {
          throw new Error("Audio features fetch failed");
        }
        const audioFeatures: any[] = resp.audio_features;
        const newTempos: typeof tempos = {};
        audioFeatures.forEach((track: any) => {
          newTempos[track.id] = track.tempo;
        });
        setTempos(newTempos);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(
          `Error in BeatsResuts when fetching audio-features: ${err}`
        );
      });
  }, []);

  function setSelectedHandler(track: TrackData) {
    const isSelected = selectedTracks[track.id];
    const newSelectedTracks: typeof selectedTracks = { ...selectedTracks };

    if (!isSelected) {
      newSelectedTracks[track.id] = track;
    } else {
      delete newSelectedTracks[track.id];
    }

    setSelectedTracks(newSelectedTracks);
  }

  const selectedTracksDuration = Object.values(selectedTracks).reduce(
    (sum, track) => sum + track.duration_ms,
    0
  );

  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const response_type = "token";
  const callback = encodeURI("http://localhost:3000/auth");
  const scope = encodeURIComponent(
    "playlist-modify-public playlist-modify-private"
  );
  const popupUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${callback}&scope=${scope}`;

  return (
    <>
      <OauthPopup
        url={popupUrl}
        onCode={(code: string) => {
          setUserToken(code);
        }}
        onClose={() => {}}
        title="Spotify Login"
        storageName="userSpotifyToken"
      >
        <LoginButtonStyle type="button">
          <Heading level={4}>Login to your Spotify</Heading>
        </LoginButtonStyle>
      </OauthPopup>

      <Heading level={4}>
        <button
          disabled={!userId}
          type="button"
          onClick={async () => {
            const { id: playlistId } = await authFetch({
              url: `https://api.spotify.com/v1/users/${userId}/playlists`,
              token: userToken,
              method: "POST",
              body: {
                name: "New Playlist",
                description: "New playlist description",
                public: false,
              },
            }).then((resp) => resp.json());

            const tracksToAdd = encodeURIComponent(
              Object.values(selectedTracks)
                .map((track) => track.uri)
                .join(",")
            );

            authFetch({
              url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${tracksToAdd}`,
              token: userToken,
              method: "POST",
            });
          }}
        >
          Add to your playlist
        </button>
      </Heading>

      <Heading level={5}>
        Playlist Length: {durationFormat(selectedTracksDuration)}
      </Heading>
      <ResultsGrid>
        {tracks.map((track) => {
          const isSelected = Boolean(selectedTracks[track.id]);
          return (
            <Track
              tempo={tempos[track.id]}
              key={track.id}
              {...track} // eslint-disable-line react/jsx-props-no-spreading
              selected={isSelected}
              selectHandler={() => {
                setSelectedHandler(track);
              }}
            />
          );
        })}
      </ResultsGrid>
    </>
  );
}
