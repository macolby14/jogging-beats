import styled from "styled-components";
import { durationFormat } from "../utils/durationFormat";
import { useMediaQuery } from "../utils/useMediaQuery";
import { Heading } from "./Heading";
import { PlaylistCreationButton } from "./PlaylistCreationButton";
import { Spacer } from "./Spacer";
import { Tooltip } from "./Tooltip";
import { TrackData } from "./Track";

interface PlaylistCreationButtonProps {
  selectedTracks: TrackData[];
  selectedTracksDuration: number;
  playlistTitle: string;
  playlistDescription: string;
  handleSongRefresh: () => void;
}

const PlaylistCreationMenuStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  place-items: center;
  padding: 8px 100px;
  border: 3px solid var(--dark);
  position: sticky;
  top: 2px;
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    padding: 8px 16px;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }
`;

const RefreshStyle = styled.svg`
  fill: var(--complement);
  cursor: pointer;

  :hover {
    fill: var(--complement-light);
  }
`;

export function PlaylistCreationMenu({
  selectedTracks,
  selectedTracksDuration,
  playlistTitle,
  playlistDescription,
  handleSongRefresh,
}: PlaylistCreationButtonProps) {
  const isMobile = useMediaQuery(768);

  return (
    <PlaylistCreationMenuStyle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Heading level={5} mobileLevel={6} weight={600}>
          <span className="desktop-only">Playlist&nbsp;</span>Length:
        </Heading>
        <Spacer size={4} />
        <Heading level={5} mobileLevel={6}>
          {durationFormat(selectedTracksDuration)}
        </Heading>
        <Spacer size={16} />
        <Heading level={5} mobileLevel={6} weight={600}>
          <span className="desktop-only">Number of&nbsp;</span> Tracks:
        </Heading>
        <Spacer size={4} />
        <Heading level={5} mobileLevel={6}>
          {selectedTracks.length}
        </Heading>
      </div>
      <PlaylistCreationButton
        selectedTracks={selectedTracks}
        duration={selectedTracksDuration}
        title={playlistTitle}
        description={playlistDescription}
      />
      <Tooltip
        direction="right"
        text="Swap out all the songs"
        style={{ marginTop: "30%", marginLeft: "4px" }}
      >
        <RefreshStyle
          xmlns="http://www.w3.org/2000/svg"
          height={isMobile ? "50" : "100"}
          viewBox="0 0 24 24"
          width={isMobile ? "50" : "100"}
          onClick={handleSongRefresh}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
        </RefreshStyle>
      </Tooltip>
    </PlaylistCreationMenuStyle>
  );
}
