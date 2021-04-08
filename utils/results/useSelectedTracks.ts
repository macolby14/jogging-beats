import { useEffect, useState } from "react";
import { TrackData } from "../../components/Track";

interface useSelectedTracksProps {
  tracks: TrackData[];
  targetDuration: number;
  loading: boolean;
}

export function useSelectedTracks({
  tracks,
  targetDuration,
  loading: loadingTracks,
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
  function replaceSelectedAtIndex(indexToReplace: number) {
    const newSelectedTracks: TrackData[] = [...selectedTracks];
    const newUnusedSongs = [...unusedSongs];
    const songToUse = newUnusedSongs.shift();

    if (!songToUse) {
      console.warn("Cannot replace song in useSelectedTracks"); // eslint-disable-line no-console
      newSelectedTracks.splice(indexToReplace, 1);
    } else {
      newSelectedTracks[indexToReplace] = songToUse;
    }

    // if (!isSelected) {
    //   newSelectedTracks[track.id] = track;
    // } else {
    //   delete newSelectedTracks[track.id];
    // }
    console.log({ newSelectedTracks });
    setSelectedTracks(newSelectedTracks);
    setUnusedSongs(newUnusedSongs);
  }

  const selectedTracksDuration = Object.values(selectedTracks).reduce(
    (sum, track) => sum + track.duration_ms,
    0
  );

  return { selectedTracks, selectedTracksDuration, replaceSelectedAtIndex };
}
