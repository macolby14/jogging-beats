import { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { authFetch } from "../utilities/authFetch";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { TrackData } from "./Track";
import { SpotifyAuthPop } from "./AuthPop/SpotifyAuthPop";

interface PlaylistCreationButtonProps {
  selectedTracks: Record<string, TrackData>;
}

const Style = styled.button`
  border: 2px solid black;
  border-radius: 10px;
  width: 200px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth: "60%",
    minHeight: "60%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function PlaylistCreationButton({
  selectedTracks,
}: PlaylistCreationButtonProps) {
  const { setUserToken, userId, userToken } = useContext(ImplicitAuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Heading level={4}>
        <Style
          //   disabled={!userId}
          type="button"
          // onClick={async () => {
          //   const { id: playlistId } = await authFetch({
          //     url: `https://api.spotify.com/v1/users/${userId}/playlists`,
          //     token: userToken,
          //     method: "POST",
          //     body: {
          //       name: "New Playlist",
          //       description: "New playlist description",
          //       public: false,
          //     },
          //   }).then((resp) => resp.json());

          //   const tracksToAdd = encodeURIComponent(
          //     Object.values(selectedTracks)
          //       .map((track) => track.uri)
          //       .join(",")
          //   );

          //   authFetch({
          //     url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${tracksToAdd}`,
          //     token: userToken,
          //     method: "POST",
          //   });
          // }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Create Playlist on Spotify
        </Style>
      </Heading>
      <Modal
        isOpen={isOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
        contentLabel="Login Required Modal"
      >
        <Heading level={4}>You must login to Spotfiy to add a Playlist</Heading>
        <SpotifyAuthPop
          onCode={(code: string) => {
            setUserToken(code);
            setIsOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
