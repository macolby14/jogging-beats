/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "../utils/useMediaQuery";

const Wrapper = styled.p`
  text-align: center;
  font-size: var(--text-size);
  font-weight: ${(props) => (props.weight ? props.weight : 400)};
  display: flex;
  justify-content: center;
`;

export function Heading({
  level,
  weight = 400,
  children,
  mobileLevel = undefined,
}) {
  const isMobile = useMediaQuery(768);

  const tag = `h${isMobile && mobileLevel ? mobileLevel : level}`;

  return (
    <Wrapper as={tag} weight={weight}>
      {children}
    </Wrapper>
  );
}
