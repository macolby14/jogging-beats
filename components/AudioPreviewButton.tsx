import { useRef, useState } from "react";
import styled from "styled-components";
import { PlayButton } from "./PlayButton";
import { Tooltip } from "./Tooltip";
// import { trackButtonStyle } from "./Track";

const AudioPlayerStyle = styled.div`
  font-size: var(--text-size-7);
  display: flex;
  align-items: center;
`;

export function AudioPreviewButton({
  url,
  className = "",
}: {
  url: string;
  className?: string;
}) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function playAudioHandler() {
    if (!audioRef || !audioRef.current) {
      // Add this to prevent null of audioRef. Had to cast as any below to avoid ts error
      throw new Error("Playing an undefined audio ref");
    }
    if (!playing) {
      (audioRef as any).current.play();
      setPlaying(true);
    } else {
      (audioRef as any).current.pause();
      setPlaying(false);
    }
  }

  const notAvailable = (
    <AudioPlayerStyle className={className}>
      <Tooltip
        direction="top"
        text="No preview available. You can play it on Spotify instead."
      >
        <PlayButton gap={6} disabled>
          <img
            src="/not_available-24px.svg"
            alt="Audio Preview not available"
          />
          <p>No Preview</p>
        </PlayButton>
      </Tooltip>
    </AudioPlayerStyle>
  );

  const playButtonImg = <img src="/play_circle_outline-24px.svg" alt="Play" />;
  const pauseButtonImg = (
    <img src="/pause_circle_outline-24px.svg" alt="Pause" />
  );

  const audioButton = (
    <AudioPlayerStyle className={className}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={url} ref={audioRef} />
      <Tooltip direction="top" text="Play a preview on this page">
        <PlayButton gap={6} type="button" onClick={playAudioHandler}>
          {playing ? pauseButtonImg : playButtonImg}
          Preview
        </PlayButton>
      </Tooltip>
    </AudioPlayerStyle>
  );

  return <>{url ? audioButton : notAvailable}</>;
}
