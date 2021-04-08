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
  label {
    font-weight: var(--font-weight-semi-bold);
  }

  input,
  textarea {
    font-weight: var(--font-weight-normal);
  }

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
    selectedGenre: [selectedGenre],
    allowExplicit: [allowExplicit],
    targetDuration: [targetDuration],
  } = useContext(SettingsContext);
  const token = useContext(TokenContext);
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [loading, setLoading] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState(
    `My Jogging Beats Playlist - ${bpm} bpm`
  );
  const [playlistDescription, setPlaylistDescription] = useState(
    `Playlist genereated from joggingbeats.com for ${bpm} bpm`
  );

  async function getMoreSongs() {
    console.log("Fetching more songs from server");
    const newSongs = await fetchSongs(
      parseInt(bpm, 10),
      parseInt(bpmTolerance, 10),
      allowExplicit,
      selectedGenre,
      token
    );
    return newSongs;
  }

  // useSelectedTracks hooks hide non-selected songs and only shows targetDuration worth of songs
  const { selectedTracks, selectedTracksDuration, replaceSelectedAtIndex} = useSelectedTracks({ tracks, targetDuration, loading, getMoreSongs }); // prettier-ignore
  const { tempos } = useTempos({ tracks });
  const isMobile = useMediaQuery(768);
  useInitialLoadSongs({
    bpm: parseInt(bpm, 10),
    bpmTolerance: parseInt(bpmTolerance, 10),
    allowExplicit,
    selectedGenre,
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
    setLoading(true);
    const newSongs = await fetchSongs(
      parseInt(bpm, 10),
      parseInt(bpmTolerance, 10),
      allowExplicit,
      selectedGenre,
      token
    );
    setTracks(newSongs);
    setLoading(false);
  }

  function removeTrack(trackToRemove: TrackData) {
    const newTracks = tracks.filter((track) => track !== trackToRemove);
    setTracks(newTracks);
  }

  const playlistContent = (
    <>
      <ResultsGrid>
        {selectedTracks.map((track, ind) => (
          <Track
            tempo={tempos[track.id]}
            key={track.id}
            {...track} // eslint-disable-line react/jsx-props-no-spreading
            selectHandler={() => {
              removeTrack(track);
              // removes from the selected array
              replaceSelectedAtIndex(ind);
            }}
          />
        ))}
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
      <PlaylistCreationMenu
        selectedTracks={selectedTracks}
        selectedTracksDuration={selectedTracksDuration}
        playlistTitle={playlistTitle}
        playlistDescription={playlistDescription}
        handleSongRefresh={refreshSongs}
      />
      <Spacer size={16} />
      {loading ? spinner : playlistContent}
    </ResultsStyle>
  );
}
