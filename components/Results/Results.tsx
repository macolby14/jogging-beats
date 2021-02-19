import styled from "styled-components";
import { durationFormat } from "../../utilities/durationFormat";
import { Heading } from "../Heading";
import { Track, TrackData } from "../Track";
import { useSelectedTracks } from "./useSelectedTracks";
import { useTempos } from "./useTempos";
import { PlaylistCreationButton } from "../PlaylistCreationButton";

/* eslint-disable camelcase */
interface ResultsProps {
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

export function Results({
  targetDuration,
  recommendations: { tracks },
}: ResultsProps) {
  const { selectedTracks, selectedTracksDuration, setSelectedHandler} = useSelectedTracks({ tracks, targetDuration }); // prettier-ignore
  const { tempos } = useTempos({ tracks });

  return (
    <>
      <PlaylistCreationButton selectedTracks={selectedTracks} />
      <Heading level={5}>
        Playlist Length: {durationFormat(selectedTracksDuration)}
      </Heading>
      <ResultsGrid>
        {tracks.map((track) => {
          const isSelected = Boolean(selectedTracks[track.id]);
          return (
            <Track
              tempo={tempos[track.id]}
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
