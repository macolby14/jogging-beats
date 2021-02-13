import { useEffect, useState } from "react";
import styled from "styled-components";
import { durationFormat } from "../utilities/durationFormat";
import { Heading } from "./Heading";
import { Track, TrackData } from "./Track";

/* eslint-disable camelcase */
interface Results {
  targetDuration: number; // in ms
  recommendations: {
    tracks: TrackData[];
  };
}

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export function BeatsResults({
  targetDuration,
  recommendations: { tracks },
}: Results) {
  const [selectedTracks, setSelectedTracks] = useState<
    Record<string, TrackData>
  >({});

  useEffect(() => {
    let length = 0;
    const newSelectedTracks: typeof selectedTracks = {};

    const bufferTime = 1 * 60 * 1000; // 1 min buffer

    for (let i = 0; i < tracks.length; i += 1) {
      if (length + tracks[i].duration_ms >= targetDuration + bufferTime) {
        break;
      }
      newSelectedTracks[tracks[i].id] = tracks[i];
      length += tracks[i].duration_ms;
    }
    setSelectedTracks(newSelectedTracks);
  }, []);

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

  return (
    <>
      <Heading level={5}>
        Playlist Length: {durationFormat(selectedTracksDuration)}
      </Heading>
      <ResultsGrid>
        {tracks.map((track) => {
          const isSelected = Boolean(selectedTracks[track.id]);
          return (
            <Track
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
}
