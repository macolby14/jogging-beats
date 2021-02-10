/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAuthFetch } from "../utilities/useAuthFetch";
import { AudioPlayer } from "./AudioPlayer";

const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const centerVertically = css`
  display: flex;
  align-items: center;
`;

const TrackStyle = styled.div`
  .play {
    grid-area: play;
    ${center}
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

  border: 1px black solid;
  padding: 16px;
  height: 100px;
  max-width: 800px;
  width: 100%;
  display: grid;
  place-content: center;
  grid-template-columns: 50px 100px 1fr 100px;
  grid-template-rows: 50px 50px;
  grid-template-areas:
    "play pic name time"
    "play pic artist tempo";
`;

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

export function Track({
  id,
  name,
  artists,
  duration_ms,
  album,
  preview_url,
}: Pick<
  TrackProps,
  "name" | "artists" | "duration_ms" | "album" | "preview_url" | "id"
>) {
  const authFetch = useAuthFetch();
  const [tempo, setTempo] = useState("");

  useEffect(() => {
    authFetch(`https://api.spotify.com/v1/audio-features/${id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setTempo(`${Math.floor(resp.tempo)}`);
      });
  }, []);

  const durMin = Math.floor(duration_ms / 1000 / 60);
  const durSec = Math.floor((duration_ms / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return (
    <TrackStyle>
      <AudioPlayer url={preview_url} className="play" />
      <div className="pic">
        <img src={album.images[2].url} alt="Album cover" />
      </div>
      <div className="name">{name}</div>
      <div className="artist">
        {artists.map((artist) => artist.name).join(", ")}
      </div>
      <div className="time">{`${durMin} min ${durSec} sec`}</div>
      <div className="tempo">{tempo ? `${tempo} bpm` : "Loading..."}</div>
    </TrackStyle>
  );
}
