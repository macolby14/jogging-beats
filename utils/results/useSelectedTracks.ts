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
  const [selectedTracks, setSelectedTracks] = useState<
    Record<string, TrackData>
  >({});
  const [unusedSongs, setUnusedSongs] = useState<TrackData[]>([]);

  useEffect(() => {
    let length = 0;
    const newSelectedTracks: typeof selectedTracks = {};
    const newUnusedSongs: TrackData[] = [];

    for (let i = 0; i < tracks.length; i += 1) {
      if (length > targetDuration) {
        newUnusedSongs.push(tracks[i]);
      } else {
        newSelectedTracks[tracks[i].id] = tracks[i];
        length += tracks[i].duration_ms;
      }
    }
    setSelectedTracks(newSelectedTracks);
    setUnusedSongs(newUnusedSongs);
  }, [loadingTracks, targetDuration]);

  // This function did toggle the song selection
  // Now it removes replaces a song with unusedSong
  function setSelectedHandler(track: TrackData) {
    const newSelectedTracks: typeof selectedTracks = { ...selectedTracks };
    const newUnsusedSongs = [...unusedSongs];
    const songToUse = unusedSongs.shift();

    if (!songToUse) {
      console.warn("Cannot replace song in useSelectedTracks"); // eslint-disable-line no-console
      delete newSelectedTracks[track.id];
    } else {
      newSelectedTracks[track.id] = songToUse;
    }

    // if (!isSelected) {
    //   newSelectedTracks[track.id] = track;
    // } else {
    //   delete newSelectedTracks[track.id];
    // }
    console.log({ newSelectedTracks });
    setSelectedTracks(newSelectedTracks);
    setUnusedSongs(newUnsusedSongs);
  }

  const selectedTracksDuration = Object.values(selectedTracks).reduce(
    (sum, track) => sum + track.duration_ms,
    0
  );

  return { selectedTracks, selectedTracksDuration, setSelectedHandler };
}
