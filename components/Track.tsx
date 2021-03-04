/* eslint-disable camelcase */
import React from "react"; // eslint-disable-line no-use-before-define
import styled, { css } from "styled-components";
import { center, centerVertically } from "../styles/globalCss";
import { durationFormat } from "../utilities/durationFormat";
import { AudioPreviewButton } from "./AudioPreviewButton";
import SpotifyPlayButton from "./SpotifyPlayButton";
import { TrackSelect } from "./TrackSelect";

interface TrackStyleProps {
  selected: boolean;
}

const selectedStyle = css`
  border: 3px solid var(--light);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
`;

const notSelectedStyle = css`
  background-color: rgba(80, 37, 18, 0.2);
  opacity: 0.6;
  border: 1px solid background-color: rgba(80, 37, 18, 1);
`;

const TrackStyle = styled.div<TrackStyleProps>`
  .play-preview {
    grid-area: play-preview;
    @media (max-width: 768px) {
      display: none;
    }
  }

  .play-spotify {
    grid-area: play-spotify;
    @media (max-width: 768px) {
      display: none;
    }
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
    @media (max-width: 768px) {
      display: none;
    }
  }

  .tempo {
    grid-area: tempo;
    ${centerVertically}
    @media (max-width: 768px) {
      display: none;
    }
  }

  .select {
    grid-area: select;
    ${center}
  }

  .selected {
    border: 5px solid orange;
  }

  ${(props) => (props.selected ? selectedStyle : notSelectedStyle)}
  padding: 8px 16px;
  max-width: 800px;
  width: 100%;
  display: grid;
  place-content: center;
  grid-template-columns: 120px 100px 1fr 100px 50px;
  grid-template-rows: 50px 50px;
  grid-template-areas:
    "play-preview pic name time select"
    "play-spotify pic artist tempo select";

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr 50px;
    grid-template-areas:
      "pic name select"
      "pic artist select";
  }
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
        {window.screen.width >= 786
          ? artists.map((artist) => artist.name).join(", ")
          : artists[0].name}
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
