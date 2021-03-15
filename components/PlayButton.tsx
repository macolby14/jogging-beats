import styled from "styled-components";

interface PlayButtonStyles {
  gap: number;
}

export const PlayButton = styled.button<PlayButtonStyles>`
  width: auto;
  font-size: var(--text-size-7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => `${props.gap}px`};
  color: inherit;
  background-color: inherit;
  box-shadow: none;
  padding: 0;

  :hover {
    background-color: inherit;
  }

  :disabled {
    color: inherit;
    cursor: not-allowed;
  }

  :active {
    box-shadow: none;
  }
`;
