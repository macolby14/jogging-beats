import { useRef, useState } from "react";

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

  const notAvailable = <div>Preview Not Available</div>;

  const playButton = (
    <div className={className}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={url} ref={audioRef} />
      <button type="button" onClick={playAudioHandler}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );

  return <div className="play">{url ? playButton : notAvailable}</div>;
}
