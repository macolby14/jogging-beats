import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";

const OptionsSelectBarStyle = styled.ul`
  width: 100%;
  height: auto;
  background-color: var(--medium);
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: var(--text-size-3);

  li {
    display: inline;
    text-decoration: none;
    padding: 16px;
    color: var(--white);
    font: inherit;
    cursor: pointer;
  }

  li:hover {
    background-color: var(--light);
  }
`;

interface OptionsSelectBarProps {
  setShownOption: React.Dispatch<React.SetStateAction<string>>;
}

export function OptionsSelectBar({ setShownOption }: OptionsSelectBarProps) {
  return (
    <OptionsSelectBarStyle>
      <li
        onClick={() => {
          setShownOption("PACE");
        }}
      >
        Pace
      </li>
      <li
        onClick={() => {
          setShownOption("GENRE");
        }}
      >
        Genre
      </li>
      <li
        onClick={() => {
          setShownOption("SIMILAR_SONGS");
        }}
      >
        Similar Songs
      </li>
    </OptionsSelectBarStyle>
  );
}
