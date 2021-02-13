import styled from "styled-components";
import { trackButtonStyle } from "./Track";

interface SpotifyPlayButtonProps {
  className?: string;
}

const SpotifyPlayButtonStyles = styled.button`
  ${trackButtonStyle}
`;

export default function SpotifyPlayButton({
  className = "",
}: SpotifyPlayButtonProps) {
  return (
    <SpotifyPlayButtonStyles className={className}>
      <img src="/Spotify_Icon_RGB_Green-21px.png" alt="Spotify Logo" />
      Play on Spotify
    </SpotifyPlayButtonStyles>
  );
}
