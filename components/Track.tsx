/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { center, centerVertically } from "../styles/globalCss";
import { durationFormat } from "../utilities/durationFormat";
import { useAuthFetch } from "../utilities/useAuthFetch";
import { AudioPlayer } from "./AudioPlayer";
import SpotifyPlayButton from "./SpotifyPlayButton";

interface TrackStyleProps {
  selected: boolean;
}

const TrackStyle = styled.div<TrackStyleProps>`
  .play-preview {
    grid-area: play-preview;
    ${centerVertically}
    font-size: var(--text-size-7);
  }

  .play-spotify {
    grid-area: play-spotify;
    ${centerVertically}
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

  background-color: ${(props) => (props.selected ? "inherit" : "lightgrey")};
  border: 1px black solid;
  padding: 16px;
  height: 100px;
  max-width: 800px;
  width: 100%;
  display: grid;
  place-content: center;
  grid-template-columns: 100px 100px 1fr 100px;
  grid-template-rows: 50px 50px;
  grid-template-areas:
    "play-preview pic name time"
    "play-spotify pic artist tempo";
`;

export interface TrackData {
  album: {
    images: { height: number; width: number; url: string }[];
  };
  artists: { name: string }[];
  duration_ms: number;
  explicit: boolean;
  // external_urls: {
  //   spotify: string;
  // };
  id: string;
  name: string;
  preview_url: string;
}

type TrackProps = TrackData & {
  selected: boolean;
};

export function Track({
  id,
  name,
  artists,
  duration_ms,
  album,
  preview_url,
  selected = false,
}: TrackProps) {
  const authFetch = useAuthFetch();
  const [tempo, setTempo] = useState("");

  useEffect(() => {
    authFetch(`https://api.spotify.com/v1/audio-features/${id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setTempo(`${Math.floor(resp.tempo)}`);
      });
  }, []);

  return (
    <TrackStyle selected={selected}>
      <AudioPlayer url={preview_url} className="play-preview" />
      <SpotifyPlayButton className="play-spotify" />
      <div className="pic">
        <img src={album.images[2].url} alt="Album cover" />
      </div>
      <div className="name">{name}</div>
      <div className="artist">
        {artists.map((artist) => artist.name).join(", ")}
      </div>
      <div className="time">{durationFormat(duration_ms)}</div>
      <div className="tempo">{tempo ? `${tempo} bpm` : "Loading..."}</div>
    </TrackStyle>
  );
}
