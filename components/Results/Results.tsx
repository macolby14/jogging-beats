import { useContext } from "react";
import styled from "styled-components";
import { authFetch } from "../../utilities/authFetch";
import { durationFormat } from "../../utilities/durationFormat";
import { ImplicitAuthContext } from "../context/ImplicitAuthProvider";
import { Heading } from "../Heading";
import { Track, TrackData } from "../Track";
import { useSelectedTracks } from "./useSelectedTracks";
import { useTempos } from "./useTempos";
import { SpotifyAuthPop } from "../AuthPop/SpotifyAuthPop";

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

export function Results({
  targetDuration,
  recommendations: { tracks },
}: ResultsProps) {
  const { selectedTracks, selectedTracksDuration, setSelectedHandler} = useSelectedTracks({ tracks, targetDuration }); // prettier-ignore
  const { tempos } = useTempos({ tracks });
  const { setUserToken, userId, userToken } = useContext(ImplicitAuthContext);

  return (
    <>
      <SpotifyAuthPop
        onCode={(code: string) => {
          setUserToken(code);
        }}
      />

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
