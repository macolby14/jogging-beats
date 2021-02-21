import React, { useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { durationFormat } from "../../utilities/durationFormat";
import { Heading } from "../Heading";
import { Track, TrackData } from "../Track";
import { useSelectedTracks } from "./useSelectedTracks";
import { useTempos } from "./useTempos";
import { PlaylistCreationButton } from "../PlaylistCreationButton";

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

const TitleStyle = styled.label`
  font-size: var(--text-size-4);
  margin: auto;

  input[type="text"] {
    font-size: var(--text-size-4);
  }

  textarea {
    vertical-align: top;
    font-size: var(--text-size-7);
  }
`;

export function Results({
  targetDuration,
  recommendations: { tracks },
}: ResultsProps) {
  const [playlistTitle, setPlaylistTitle] = useState(
    "My Jogging Beats Playlist"
  );
  const [playlistDescription, setPlaylistDescription] = useState(
    "My playlist from joggingbeats.com"
  );
  const { selectedTracks, selectedTracksDuration, setSelectedHandler} = useSelectedTracks({ tracks, targetDuration }); // prettier-ignore
  const { tempos } = useTempos({ tracks });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaylistTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlaylistDescription(e.target.value);
  }

  return (
    <>
      <TitleStyle>
        Playlist title:&nbsp;
        <input type="text" value={playlistTitle} onChange={handleTitleChange} />
      </TitleStyle>
      <TitleStyle>
        Playlist description:&nbsp;
        <textarea
          rows={3}
          cols={50}
          value={playlistDescription}
          onChange={handleDescriptionChange}
        />
      </TitleStyle>
      <PlaylistCreationButton
        selectedTracks={selectedTracks}
        duration={selectedTracksDuration}
        title={playlistTitle}
        description={playlistDescription}
      />
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
