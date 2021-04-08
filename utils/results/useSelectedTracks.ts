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

  useEffect(() => {
    let length = 0;
    const newSelectedTracks: typeof selectedTracks = {};

    for (let i = 0; i < tracks.length; i += 1) {
      if (length > targetDuration) {
        break;
      }
      newSelectedTracks[tracks[i].id] = tracks[i];
      length += tracks[i].duration_ms;
    }
    setSelectedTracks(newSelectedTracks);
  }, [loadingTracks, targetDuration]);

  function setSelectedHandler(track: TrackData) {
    const isSelected = selectedTracks[track.id];
    const newSelectedTracks: typeof selectedTracks = { ...selectedTracks };

    if (!isSelected) {
      newSelectedTracks[track.id] = track;
    } else {
      delete newSelectedTracks[track.id];
    }

    setSelectedTracks(newSelectedTracks);
  }

  const selectedTracksDuration = Object.values(selectedTracks).reduce(
    (sum, track) => sum + track.duration_ms,
    0
  );

  return { selectedTracks, selectedTracksDuration, setSelectedHandler };
}
