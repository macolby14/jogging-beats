import styled from "styled-components";

interface PlayButtonStyles {
  gap: number;
}

export const PlayButton = styled.button<PlayButtonStyles>`
  font-size: var(--text-size-7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => `${props.gap}px`};
`;
