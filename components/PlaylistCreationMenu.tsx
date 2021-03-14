import styled from "styled-components";
import { durationFormat } from "../utils/durationFormat";
import { Heading } from "./Heading";
import { PlaylistCreationButton } from "./PlaylistCreationButton";
import { TrackData } from "./Track";

interface PlaylistCreationButtonProps {
  selectedTracks: Record<string, TrackData>;
  selectedTracksDuration: number;
  playlistTitle: string;
  playlistDescription: string;
}

const PlaylistCreationMenuStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 32px 16px;
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
          alignItems: "flex-start",
        }}
      >
        <Heading level={5}>
          Playlist Length: {durationFormat(selectedTracksDuration)}
        </Heading>
        <Heading level={5}>
          Number of Tracks: {Object.keys(selectedTracks).length}
        </Heading>
      </div>
      <PlaylistCreationButton
        selectedTracks={selectedTracks}
        duration={selectedTracksDuration}
        title={playlistTitle}
        description={playlistDescription}
      />
      <div>Refresh Button</div>
    </PlaylistCreationMenuStyle>
  );
}
