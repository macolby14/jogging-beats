import styled from "styled-components";
import { durationFormat } from "../utils/durationFormat";
import { Heading } from "./Heading";
import { PlaylistCreationButton } from "./PlaylistCreationButton";
import { Spacer } from "./Spacer";
import { TrackData } from "./Track";

interface PlaylistCreationButtonProps {
  selectedTracks: Record<string, TrackData>;
  selectedTracksDuration: number;
  playlistTitle: string;
  playlistDescription: string;
}

const PlaylistCreationMenuStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  place-items: center;
  gap: 16px;
  padding: 32px 100px;
  border: 1px solid var(--dark);
  position: sticky;
  top: 0px;
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 1;
`;

export function PlaylistCreationMenu({
  selectedTracks,
  selectedTracksDuration,
  playlistTitle,
  playlistDescription,
}: PlaylistCreationButtonProps) {
  return (
    <PlaylistCreationMenuStyle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Heading level={5}>Playlist Length:</Heading>
        <Spacer size={4} />
        <Heading level={5}>{durationFormat(selectedTracksDuration)}</Heading>
        <Spacer size={16} />
        <Heading level={5}>Number of Tracks: </Heading>
        <Spacer size={4} />
        <Heading level={5}>{Object.keys(selectedTracks).length}</Heading>
      </div>
      <PlaylistCreationButton
        selectedTracks={selectedTracks}
        duration={selectedTracksDuration}
        title={playlistTitle}
        description={playlistDescription}
      />
      <div>
        <img src="/cached-24px.svg" alt="Get new Songs" width="100px" />
      </div>
    </PlaylistCreationMenuStyle>
  );
}
