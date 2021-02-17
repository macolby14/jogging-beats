/* eslint-disable camelcase */
import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { center, centerVertically } from "../styles/globalCss";
import { durationFormat } from "../utilities/durationFormat";
import { AudioPreviewButton } from "./AudioPreviewButton";
import SpotifyPlayButton from "./SpotifyPlayButton";
import { TrackSelect } from "./TrackSelect";

interface TrackStyleProps {
  selected: boolean;
}

const TrackStyle = styled.div<TrackStyleProps>`
  .play-preview {
    grid-area: play-preview;
  }

  .play-spotify {
    grid-area: play-spotify;
  }

  .pic {
    grid-area: pic;
    ${center}
  }

  .name {
    grid-area: name;
    ${centerVertically}
  }

  .artist {
    grid-area: artist;
    ${centerVertically}
  }

  .time {
    grid-area: time;
    ${centerVertically}
  }

  .tempo {
    grid-area: tempo;
    ${centerVertically}
  }

  .select {
    grid-area: select;
    ${center}
  }

  background-color: ${(props) => (props.selected ? "inherit" : "lightgrey")};
  border: 1px black solid;
  padding: 8px 16px;
  max-width: 800px;
  width: 100%;
  display: grid;
  place-content: center;
  grid-template-columns: 100px 100px 1fr 100px 50px;
  grid-template-rows: 50px 50px;
  grid-template-areas:
    "play-preview pic name time select"
    "play-spotify pic artist tempo select";
`;

export interface TrackData {
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
  uri: string;
}

type TrackProps = TrackData & {
  selected: boolean;
  selectHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // eslint-disable-line no-unused-vars
  tempo: number | null;
};

export function Track({
  name,
  artists,
  duration_ms,
  album,
  preview_url,
  external_urls: { spotify: spotifyLink },
  selected = false,
  selectHandler,
  tempo = null,
}: TrackProps) {
  return (
    <TrackStyle selected={selected}>
      <AudioPreviewButton url={preview_url} className="play-preview" />
      <SpotifyPlayButton link={spotifyLink} className="play-spotify" />
      <div className="pic">
        <img src={album.images[2].url} alt="Album cover" />
      </div>
      <div className="name">{name}</div>
      <div className="artist">
        {artists.map((artist) => artist.name).join(", ")}
      </div>
      <div className="time">{durationFormat(duration_ms)}</div>
      <div className="tempo">
        {tempo ? `${Math.round(tempo)} bpm` : "Loading..."}
      </div>
      <TrackSelect
        className="select"
        selected={selected}
        selectHandler={selectHandler}
      />
    </TrackStyle>
  );
}
