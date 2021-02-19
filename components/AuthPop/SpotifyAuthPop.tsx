import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { Heading } from "../Heading";
import OauthPopup from "./OAuthPop";

interface SpotifyAuthPopProps {
  onCode: (params: any) => any; // eslint-disable-line no-unused-vars
}

const LoginButtonStyle = styled.button`
  border: 2px solid black;
  border-radius: 10px;
`;

export function SpotifyAuthPop({ onCode }: SpotifyAuthPopProps) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const responseType = "token";
  const callback = encodeURI("http://localhost:3000/auth");
  const scope = encodeURIComponent(
    "playlist-modify-public playlist-modify-private"
  );
  const popupUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${callback}&scope=${scope}`;

  return (
    <OauthPopup
      url={popupUrl}
      onCode={onCode}
      onClose={() => {}}
      title="Spotify Login"
      storageName="userSpotifyToken"
    >
      <LoginButtonStyle type="button">
        <Heading level={4}>Login to your Spotify</Heading>
      </LoginButtonStyle>
    </OauthPopup>
  );
}
