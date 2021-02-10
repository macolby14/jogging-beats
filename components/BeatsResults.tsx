import styled, { css } from "styled-components";
import { Heading } from "./Heading";
import { Spacer } from "./Spacer";

/* eslint-disable camelcase */

interface TrackProps {
  album: {
    images: { height: number; width: number; url: string }[];
  };
  artists: { name: string }[];
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
  preview_url: string;
  type: "track";
}

interface Results {
  recommendations: {
    tracks: TrackProps[];
  };
}

const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrackStyle = styled.div`
  .play {
    ${center}
    grid-area: play;
  }

  .pic {
    ${center}
    grid-area: pic;
  }

  .name {
    display: grid;
    align-items: center;
    grid-area: name;
  }

  .artist {
    display: grid;
    align-items: center;
    grid-area: artist;
  }

  .time {
    ${center}
    grid-area: time;
  }

  border: 1px black solid;
  padding: 16px;
  height: 100px;
  max-width: 800px;
  width: 100%;
  display: grid;
  place-content: center;
  grid-template-columns: 50px 100px 1fr 50px;
  grid-template-rows: 50px 50px;
  grid-template-areas:
    "play pic name time"
    "play pic artist time";
`;

export function Track({
  name,
  artists,
  duration_ms,
  album,
}: Pick<TrackProps, "name" | "artists" | "duration_ms" | "album">) {
  const durMin = Math.floor(duration_ms / 1000 / 60);
  const durSec = Math.floor((duration_ms / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return (
    <TrackStyle>
      <div className="play">Play</div>
      <div className="pic">
        <img src={album?.images[2].url} alt="Album cover" />
      </div>
      <div className="name">{name}</div>
      <div className="artist">
        {artists.map((artist) => artist.name).join(", ")}
      </div>
      <div className="time">{`${durMin} : ${durSec}`}</div>
    </TrackStyle>
  );
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
