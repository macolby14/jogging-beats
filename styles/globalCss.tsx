import { createGlobalStyle, css } from "styled-components";

export const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const centerVertically = css`
  display: flex;
  align-items: center;
`;

export const GlobalStyle = createGlobalStyle`
  body{
    .desktop-only{
      @media(max-width: 768px){
        display: none;
      }
    }
  }
`;
