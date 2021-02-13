import { useRef, useState } from "react";
import styled from "styled-components";
import { trackButtonStyle } from "./Track";

const AudioPlayerStyle = styled.div`
  ${trackButtonStyle}
  button {
    gap: 10px;
  }
`;

export function AudioPlayer({
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
      Preview Not Available
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
      <button type="button" onClick={playAudioHandler}>
        {playing ? pauseButtonImg : playButtonImg}
        Preview
      </button>
    </AudioPlayerStyle>
  );

  return <>{url ? audioButton : notAvailable}</>;
}
