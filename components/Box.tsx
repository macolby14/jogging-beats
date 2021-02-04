import styled from "styled-components";

interface BoxProps {
  size?: number;
  gap?: number;
}

export const Box = styled.div<BoxProps>`
  background-color: red;
  font-size: 5rem;
  max-width: ${(props) => (props.size ? `${props.size}px` : "100%")};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap ? `${props.gap}rem` : 0)};
`;
