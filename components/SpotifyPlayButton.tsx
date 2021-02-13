import { PlayButton } from "./PlayButton";
// import { trackButtonStyle } from "./Track";

interface SpotifyPlayButtonProps {
  className?: string;
  link: string;
}

export default function SpotifyPlayButton({
  className = "",
  link,
}: SpotifyPlayButtonProps) {
  function clickSpotifyButtonHandler() {
    window.open(
      link,
      "_blank" // <- This is what makes it open in a new window.
    );
  }

  return (
    <PlayButton
      gap={2}
      className={className}
      onClick={clickSpotifyButtonHandler}
    >
      <img src="/Spotify_Icon_RGB_Green-21px.png" alt="Spotify Logo" />
      Play on Spotify
    </PlayButton>
  );
}
