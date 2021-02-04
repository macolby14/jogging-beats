/* eslint-disable react/prop-types */
// eslint-disable-next-line no-use-before-define
import React from "react";
import styled from "styled-components";

const Wrapper = styled.p`
  text-align: center;
  font-size: var(--text-size);
`;

export function Heading({ level, children }) {
  const tag = `h${level}`;
  return <Wrapper as={tag}>{children}</Wrapper>;
}
