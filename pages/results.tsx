import React, { useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { durationFormat } from "../utils/durationFormat";
import { Heading } from "../components/Heading";
import { Track, TrackData } from "../components/Track";
import { useSelectedTracks } from "../utils/results/useSelectedTracks";
import { useTempos } from "../utils/results/useTempos";
import { useLoadSongsFromParams } from "../utils/results/useLoadSongsFromParams";
import { PlaylistCreationButton } from "../components/PlaylistCreationButton";

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
    font: inherit;
    font-size: var(--text-size-4);
  }

  textarea {
    vertical-align: top;
    font: inherit;
    font-size: var(--text-size-5);
  }
`;

export default function Results() {
  const router = useRouter();
  const { bpm: bpmParam, targetDuration: targetDurationParam } = router.query;
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [targetDuration, setTargetDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState(
    "My Jogging Beats Playlist"
  );
  const [playlistDescription, setPlaylistDescription] = useState(
    "My playlist from joggingbeats.com"
  );
  const { selectedTracks, selectedTracksDuration, setSelectedHandler} = useSelectedTracks({ tracks, targetDuration }); // prettier-ignore
  const { tempos } = useTempos({ tracks });
  useLoadSongsFromParams({
    bpmParam,
    targetDurationParam,
    setTargetDuration,
    setLoading,
    setTracks,
  });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaylistTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlaylistDescription(e.target.value);
  }

  const playlistContent = (
    <>
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

  const spinner = <div>Loading...</div>;

  return (
    <>
      <TitleStyle>
        Playlist title:&nbsp;
        <input type="text" value={playlistTitle} onChange={handleTitleChange} />
      </TitleStyle>
      <TitleStyle>
        Playlist description:&nbsp;
        <textarea
          rows={
            typeof window !== "undefined" && window.screen.width >= 768 ? 3 : 6
          }
          cols={
            typeof window !== "undefined" && window.screen.width >= 768
              ? 50
              : 25
          }
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
      {loading ? spinner : playlistContent}
    </>
  );
}
