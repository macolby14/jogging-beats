/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React from "react";
import styled from "styled-components";

const Wrapper = styled.p`
  text-align: center;
  font-size: var(--text-size);
  font-weight: ${(props) => (props.weight ? props.weight : 400)};
`;

export function Heading({ level, weight = 400, children }) {
  const tag = `h${level}`;
  return (
    <Wrapper as={tag} weight={weight}>
      {children}
    </Wrapper>
  );
}
