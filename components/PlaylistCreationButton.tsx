import { useContext } from "react";
import styled from "styled-components";
import { authFetch } from "../utilities/authFetch";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { TrackData } from "./Track";

interface PlaylistCreationButtonProps {
  selectedTracks: Record<string, TrackData>;
}

const Style = styled.button`
  border: 2px solid black;
  border-radius: 10px;
  width: 200px;
`;

export function PlaylistCreationButton({
  selectedTracks,
}: PlaylistCreationButtonProps) {
  const { userId, userToken } = useContext(ImplicitAuthContext);

  return (
    <Heading level={4}>
      <Style
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
        Create Playlist on Spotify
      </Style>
    </Heading>
  );
}
