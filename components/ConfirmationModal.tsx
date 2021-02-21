import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { authFetch } from "../utilities/authFetch";
import { durationFormat } from "../utilities/durationFormat";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { TrackData } from "./Track";

Modal.setAppElement("#__next");

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth: "60%",
    minHeight: "60%",
    maxWidth: "90vh",
    maxHeight: "90vh",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TrackInfoStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px;
  width: 100%;
  gap: 32px;
`;

interface TrackInfoProps {
  name: string;
  artist: string;
  duration: number;
}

function TrackInfo({ name, artist, duration }: TrackInfoProps) {
  return (
    <TrackInfoStyle>
      <p>
        {name} by {artist}
      </p>
      <p>{durationFormat(duration)}</p>
    </TrackInfoStyle>
  );
}

const TracksListStyle = styled.div`
  height: 40vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
`;

function TracksList({ tracks }: { tracks: TrackData[] }) {
  return (
    <TracksListStyle>
      <TrackInfoStyle>
        <p>
          <em>Song</em>
        </p>
        <p>
          <em>Duration</em>
        </p>
      </TrackInfoStyle>
      {tracks.map((track) => (
        <TrackInfo
          key={track.id}
          name={track.name}
          artist={track.artists[0].name}
          duration={track.duration_ms}
        />
      ))}
    </TracksListStyle>
  );
}

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

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
  const router = useRouter();
  const { userId, userToken } = useContext(ImplicitAuthContext);
  const [loading, setLoading] = useState(false);

  const tracksArray = Object.values(selectedTracks);

  async function createPlaylist() {
    const {
      id: playlistId,
      external_urls: { spotify: playlistLink },
    }: {
      id: string;
      external_urls: { spotify: string }; // eslint-disable-line camelcase
      other: any;
    } = await authFetch({
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

    return playlistLink;
  }

  const content = (
    <Style>
      <Heading level={4}>
        Please confirm the songs in this playlist before we add it to your
        Spotify:
      </Heading>
      <div>
        <p>Playlist Title: This is a very long playlist title</p>
        <p>Length: {durationFormat(duration)}</p>
        <p>Number of Songs: {tracksArray.length}</p>
      </div>
      <TracksList tracks={tracksArray} />
      <div>
        <button
          type="button"
          onClick={async () => {
            setLoading(true);
            const link = await createPlaylist();
            setIsOpen(false);
            setLoading(false);
            router.push(`/playlist/${encodeURIComponent(link)}`);
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
    </Style>
  );

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      style={modalStyles}
      contentLabel="Confirmation of Tracks Modal"
    >
      {loading ? "Loading..." : content}
    </Modal>
  );
}
