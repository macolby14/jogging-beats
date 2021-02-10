import styled from "styled-components";
import { Heading } from "./Heading";
import { Spacer } from "./Spacer";
import { Track } from "./Track";

/* eslint-disable camelcase */
interface Results {
  recommendations: {
    tracks: any[];
  };
}

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export function BeatsResults({ recommendations: { tracks } }: Results) {
  console.log(tracks);
  return (
    <>
      <Heading level={4}>Beats Results</Heading>
      <Spacer size={16} />
      <ResultsGrid>
        {tracks.map((track) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Track key={track.id} {...track} />
        ))}
      </ResultsGrid>
    </>
  );
}
