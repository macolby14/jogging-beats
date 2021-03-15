import styled from "styled-components";
import { PlayButton } from "./PlayButton";
import { Tooltip } from "./Tooltip";

const SpotifyPlayButtonStyle = styled.div`
  display: flex;
  align-items: center;
`;

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
    <SpotifyPlayButtonStyle>
      <Tooltip
        direction="bottom"
        gap={5}
        text="Open the Spotify player to play this song"
      >
        <PlayButton
          gap={8}
          className={className}
          onClick={clickSpotifyButtonHandler}
        >
          <img src="/Spotify_Icon_RGB_Green-21px.png" alt="Spotify Logo" />
          <p style={{ textAlign: "left" }}>
            Play<span className="desktop-only">&nbsp;on Spotify</span>
          </p>
        </PlayButton>
      </Tooltip>
    </SpotifyPlayButtonStyle>
  );
}
