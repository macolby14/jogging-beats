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

interface SelectedState {
  selectedTracks: Record<string, TrackData>;
  duration: number;
}

export function BeatsResults({
  targetDuration,
  recommendations: { tracks },
}: Results) {
  const [selected, setSelected] = useState<SelectedState>({
    selectedTracks: {},
    duration: 0,
  });

  useEffect(() => {
    let length = 0;
    const newSelectedTracks: Record<string, TrackData> = {};

    const bufferTime = 1 * 60 * 1000; // 1 min buffer

    for (let i = 0; i < tracks.length; i += 1) {
      if (length + tracks[i].duration_ms >= targetDuration + bufferTime) {
        break;
      }
      newSelectedTracks[tracks[i].id] = tracks[i];
      length += tracks[i].duration_ms;
    }
    setSelected({
      selectedTracks: newSelectedTracks,
      duration: length,
    });
  }, []);

  return (
    <>
      <Heading level={4}>
        Playlist Length: {durationFormat(selected.duration)}
      </Heading>
      <ResultsGrid>
        {tracks.map((track) => {
          const isSelected = Boolean(selected.selectedTracks[track.id]);
          console.log(`${track.id}: isSelected: ${isSelected}`);
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Track key={track.id} {...track} selected={isSelected} />;
        })}
      </ResultsGrid>
    </>
  );
}
