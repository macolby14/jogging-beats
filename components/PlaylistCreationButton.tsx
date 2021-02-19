import { useContext } from "react";
import { authFetch } from "../utilities/authFetch";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { TrackData } from "./Track";

interface PlaylistCreationButtonProps {
  selectedTracks: Record<string, TrackData>;
}

export function PlaylistCreationButton({
  selectedTracks,
}: PlaylistCreationButtonProps) {
  const { userId, userToken } = useContext(ImplicitAuthContext);

  return (
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
      <Heading level={4}> Add to your playlist </Heading>
    </button>
  );
}
