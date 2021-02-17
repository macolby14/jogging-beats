import { useContext } from "react";
import styled from "styled-components";
import { authFetch } from "../../utilities/authFetch";
import { durationFormat } from "../../utilities/durationFormat";
import { ImplicitAuthContext } from "../context/ImplicitAuthProvider";
import OauthPopup from "../OAuthPop";
import { Heading } from "../Heading";
import { Track, TrackData } from "../Track";
import { useSelectedTracks } from "./useSelectedTracks";
import { useTempos } from "./useTempos";

/* eslint-disable camelcase */
interface ResultsProps {
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

export function Results({
  targetDuration,
  recommendations: { tracks },
}: ResultsProps) {
  const { selectedTracks, selectedTracksDuration, setSelectedHandler} = useSelectedTracks({ tracks, targetDuration }); // prettier-ignore
  const { tempos } = useTempos({ tracks });
  const { setUserToken, userId, userToken } = useContext(ImplicitAuthContext);

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
