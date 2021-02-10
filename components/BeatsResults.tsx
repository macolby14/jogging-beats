import styled from "styled-components";
import { durationFormat } from "../utilities/durationFormat";
import { Heading } from "./Heading";
import { Track, TrackProps } from "./Track";

/* eslint-disable camelcase */
interface Results {
  targetDuration: number;
  recommendations: {
    tracks: TrackProps[];
  };
}

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export function BeatsResults({ recommendations: { tracks } }: Results) {
  const playlistDuration = tracks.reduce(
    (totalLen, track) => totalLen + track.duration_ms,
    0
  );
  return (
    <>
      <Heading level={4}>
        Playlist Length: {durationFormat(playlistDuration)}
      </Heading>
      <ResultsGrid>
        {tracks.map((track) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Track key={track.id} {...track} />
        ))}
      </ResultsGrid>
    </>
  );
}
