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

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default function Results() {
  const {
    bpm: [bpm],
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
  useInitialLoadSongs({
    bpm: parseInt(bpm, 10),
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
      5,
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
