import { useEffect, useState } from "react";
import { TrackData } from "../../components/Track";

interface useSelectedTracksProps {
  tracks: TrackData[];
  targetDuration: number;
  loading: boolean;
  getMoreSongs: () => Promise<TrackData[]>;
}

export function useSelectedTracks({
  tracks,
  targetDuration,
  loading: loadingTracks,
  getMoreSongs,
}: useSelectedTracksProps) {
  const [selectedTracks, setSelectedTracks] = useState<TrackData[]>([]);
  const [unusedSongs, setUnusedSongs] = useState<TrackData[]>([]);

  useEffect(() => {
    let length = 0;
    const newSelectedTracks: typeof selectedTracks = [];
    const newUnusedSongs: TrackData[] = [];

    for (let i = 0; i < tracks.length; i += 1) {
      if (length > targetDuration) {
        newUnusedSongs.push(tracks[i]);
      } else {
        newSelectedTracks.push(tracks[i]);
        length += tracks[i].duration_ms;
      }
    }
    setSelectedTracks(newSelectedTracks);
    setUnusedSongs(newUnusedSongs);
  }, [loadingTracks, targetDuration]);

  // This function did toggle the song selection
  // Now it removes replaces a song with unusedSong
  async function replaceSelectedAtIndex(indexToReplace: number) {
    const newSelectedTracks: TrackData[] = [...selectedTracks];
    const newUnusedSongs = [...unusedSongs];
    const songToUse = newUnusedSongs.shift();

    if (!songToUse) {
      console.error("Cannot replace song in useSelectedTracks"); // eslint-disable-line no-console
      newSelectedTracks.splice(indexToReplace, 1);
    } else {
      newSelectedTracks[indexToReplace] = songToUse;
    }

    setSelectedTracks(newSelectedTracks);

    // * If the unused songs is about to run out, get more songs from the server so we will never wait to swap songs
    if (newUnusedSongs.length <= 4) {
      const newFetchedSongs = await getMoreSongs();
      setUnusedSongs([...newUnusedSongs, ...newFetchedSongs]);
    } else {
      setUnusedSongs(newUnusedSongs);
    }

    console.log(`Unused songs left: ${newUnusedSongs.length}`);
  }

  const selectedTracksDuration = Object.values(selectedTracks).reduce(
    (sum, track) => sum + track.duration_ms,
    0
  );

  return { selectedTracks, selectedTracksDuration, replaceSelectedAtIndex };
}
