import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { authFetch } from "../utils/authFetch";
import { durationFormat } from "../utils/durationFormat";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { LoadingIcon } from "./LoadingIcon";
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
  overlay: {
    zIndex: 2,
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

  strong {
    font-size: 32px;
  }
`;

function TracksList({ tracks }: { tracks: TrackData[] }) {
  return (
    <TracksListStyle>
      <TrackInfoStyle>
        <p>
          <strong className="big">Song</strong>
        </p>
        <p>
          <strong className="big">Duration</strong>
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

const ButtonsStyle = styled.div`
  display: flex;
  gap: 32px;
  button {
    width: 150px;
  }
`;

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  selectedTracks: TrackData[];
  duration: number;
  title: string;
  description: string;
}

export function ConfirmationModal({
  isOpen,
  setIsOpen,
  selectedTracks,
  duration,
  title,
  description,
}: Props) {
  const router = useRouter();
  const { userId, userToken } = useContext(ImplicitAuthContext);
  const [loading, setLoading] = useState(false);

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
        name: title,
        description,
        public: false,
      },
    }).then((resp) => resp.json());

    const tracksToAdd = encodeURIComponent(
      selectedTracks.map((track) => track.uri).join(",")
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
        <p>Playlist Title: {title}</p>
        <p>Length: {durationFormat(duration)}</p>
        <p>Number of Songs: {selectedTracks.length}</p>
      </div>
      <TracksList tracks={selectedTracks} />
      <ButtonsStyle>
        <button
          type="button"
          className="button"
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
      </ButtonsStyle>
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
      {loading ? <LoadingIcon /> : content}
    </Modal>
  );
}
