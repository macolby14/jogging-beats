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
  selectedTracksLength: number;
}

export function BeatsResults({
  targetDuration,
  recommendations: { tracks },
}: Results) {
  const [selected, setSelected] = useState<SelectedState>({
    selectedTracks: {},
    selectedTracksLength: 0,
  });

  const playlistDuration = tracks.reduce(
    (totalLen, track) => totalLen + track.duration_ms,
    0
  );

  useEffect(() => {
    let length = selected.selectedTracksLength;
    const newSelectedTracks: Record<string, TrackData> = {};
    for (let i = 0; i < tracks.length; i += 1) {
      if (length >= targetDuration) {
        break;
      }
      newSelectedTracks[tracks[i].id] = tracks[i];
      length += tracks[i].duration_ms;
    }
    setSelected({
      selectedTracks: newSelectedTracks,
      selectedTracksLength: length,
    });
  }, []);

  return (
    <>
      <Heading level={4}>
        Playlist Length: {durationFormat(playlistDuration)}
      </Heading>
      <ResultsGrid>
        {tracks.map((track) => {
          const isSelected = selected.selectedTracks[track.id] !== null;
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Track key={track.id} {...track} selected={isSelected} />;
        })}
      </ResultsGrid>
    </>
  );
}
