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

  // Exists as a cache to make sure we don't re-add the same songs twice
  const [seenSongs, setSeenSongs] = useState<Record<string, TrackData>>({});

  useEffect(() => {
    let length = 0;
    const newSelectedTracks: typeof selectedTracks = [];
    const newUnusedSongs: TrackData[] = [];
    const newSeenSongs = { ...seenSongs };

    for (let i = 0; i < tracks.length; i += 1) {
      newSeenSongs[tracks[i].id] = tracks[i];

      if (length > targetDuration) {
        newUnusedSongs.push(tracks[i]);
      } else {
        newSelectedTracks.push(tracks[i]);
        length += tracks[i].duration_ms;
      }
    }
    setSelectedTracks(newSelectedTracks);
    setUnusedSongs(newUnusedSongs);
    setSeenSongs(seenSongs);
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

    // convert to set and back to remove duplicates
    setSelectedTracks([...new Set(newSelectedTracks)]);

    // * If the unused songs is about to run out, get more songs from the server so we will never wait to swap songs
    if (newUnusedSongs.length <= 4) {
      const newFetchedSongs = await getMoreSongs();
      const filteredFetchedSongs = newFetchedSongs.filter(
        (track) => !(track.id in seenSongs)
      );
      setUnusedSongs([...newUnusedSongs, ...filteredFetchedSongs]);

      const newSeenSongs = { ...seenSongs };

      filteredFetchedSongs.forEach((track) => {
        newSeenSongs[track.id] = track;
      });
      setSeenSongs(newSeenSongs);
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
