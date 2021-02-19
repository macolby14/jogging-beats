import { useContext } from "react";
import Modal from "react-modal";
import { authFetch } from "../utilities/authFetch";
import { durationFormat } from "../utilities/durationFormat";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { TrackData } from "./Track";

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

// function TrackInfo({ name: string, artist: string, duration: number }) {
//   return <div>{name} by {artist}</div>;
// }

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  selectedTracks: Record<string, TrackData>;
  duration: number;
}

export function ConfirmationModal({
  isOpen,
  setIsOpen,
  selectedTracks,
  duration,
}: Props) {
  const { userId, userToken } = useContext(ImplicitAuthContext);

  const tracksArray = Object.values(selectedTracks);

  async function createPlaylist() {
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

    await authFetch({
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${tracksToAdd}`,
      token: userToken,
      method: "POST",
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      style={customStyles}
      contentLabel="Confirmation of Tracks Modal"
    >
      <Heading level={4}>
        Please confirm the songs in this playlist before we add it to your
        Spotify account:
      </Heading>
      <Heading level={5}>Length: {durationFormat(duration)}</Heading>
      <Heading level={5}>Number of Songs: {tracksArray.length}</Heading>
      <div>This is where the songs will go</div>
      <div>
        <button
          type="button"
          onClick={async () => {
            await createPlaylist();
            setIsOpen(false);
          }}
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Go Back
        </button>
      </div>
    </Modal>
  );
}
