import React, { useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { Track, TrackData } from "../components/Track";
import { useSelectedTracks } from "../utils/results/useSelectedTracks";
import { useTempos } from "../utils/results/useTempos";
import { useLoadSongsFromParams } from "../utils/results/useLoadSongsFromParams";
import { PlaylistCreationMenu } from "../components/PlaylistCreationMenu";

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default function Results() {
  const router = useRouter();
  const {
    bpm: bpmParam,
    targetDuration: targetDurationParam,
    allowExplicit: allowExplicitParam,
    selectedGenres: selectedGenresParam,
  } = router.query;
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
    allowExplicitParam,
    selectedGenresParam,
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
      <PlaylistCreationMenu
        selectedTracks={selectedTracks}
        selectedTracksDuration={selectedTracksDuration}
        playlistTitle={playlistTitle}
        playlistDescription={playlistDescription}
      />
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
      <label>
        Playlist title:&nbsp;
        <input type="text" value={playlistTitle} onChange={handleTitleChange} />
      </label>
      <label>
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
      </label>

      {loading ? spinner : playlistContent}
    </>
  );
}
