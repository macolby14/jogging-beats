import React, { useContext, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { Track, TrackData } from "../components/Track";
import { useSelectedTracks } from "../utils/results/useSelectedTracks";
import { useTempos } from "../utils/results/useTempos";
import { useInitialLoadSongs } from "../utils/results/useInitialLoadSongs";
import { PlaylistCreationMenu } from "../components/PlaylistCreationMenu";
import { SettingsContext } from "../components/context/SettingsProvider";
import { fetchSongs } from "../utils/results/fetchSongs";
import { TokenContext } from "../components/context/TokenProvider";
import { useMediaQuery } from "../utils/useMediaQuery";
import { Spacer } from "../components/Spacer";

const ResultsStyle = styled.div`
  @media (max-width: 768px) {
    label {
      font-size: var(--text-size-5);
    }

    input,
    textarea {
      font-size: var(--text-size-6);
    }
  }
`;

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default function Results() {
  const {
    bpm: [bpm],
    bpmTolerance: [bpmTolerance],
    selectedGenres: [selectedGenres],
    allowExplicit: [allowExplicit],
    targetDuration: [targetDuration],
  } = useContext(SettingsContext);
  const token = useContext(TokenContext);
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [loading, setLoading] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState(
    "My Jogging Beats Playlist"
  );
  const [playlistDescription, setPlaylistDescription] = useState(
    "My playlist from joggingbeats.com"
  );
  const { selectedTracks, selectedTracksDuration, setSelectedHandler} = useSelectedTracks({ tracks, targetDuration }); // prettier-ignore
  const { tempos } = useTempos({ tracks });
  const isMobile = useMediaQuery(768);
  useInitialLoadSongs({
    bpm: parseInt(bpm, 10),
    bpmTolerance: parseInt(bpmTolerance, 10),
    allowExplicit,
    selectedGenres,
    setLoading,
    setTracks,
  });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaylistTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlaylistDescription(e.target.value);
  }

  async function refreshSongs() {
    const selectedTracksOnly = tracks.filter((track) =>
      Boolean(selectedTracks[track.id])
    );
    setTracks(selectedTracksOnly);
    const newSongs = await fetchSongs(
      parseInt(bpm, 10),
      parseInt(bpmTolerance, 10),
      allowExplicit,
      Object.keys(selectedGenres),
      token
    );
    setTracks(selectedTracksOnly.concat(newSongs));
  }

  const playlistContent = (
    <>
      <PlaylistCreationMenu
        selectedTracks={selectedTracks}
        selectedTracksDuration={selectedTracksDuration}
        playlistTitle={playlistTitle}
        playlistDescription={playlistDescription}
        handleSongRefresh={refreshSongs}
      />
      <Spacer size={16} />
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
    <ResultsStyle>
      <label>
        Playlist title:&nbsp;
        <input type="text" value={playlistTitle} onChange={handleTitleChange} />
      </label>
      <label>
        Playlist description:&nbsp;
        <textarea
          rows={isMobile ? 2 : 1}
          cols={30}
          value={playlistDescription}
          onChange={handleDescriptionChange}
        />
      </label>
      {loading ? spinner : playlistContent}
    </ResultsStyle>
  );
}
