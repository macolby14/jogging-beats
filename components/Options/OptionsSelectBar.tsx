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
  box-shadow: 1px 2px 2px #df6430;

  li {
    display: inline;
    text-decoration: none;
    padding: 16px;
    color: var(--white);
    font: inherit;
    cursor: pointer;
    border: 1px solid rgba(56, 26, 13, 0.2);
    border-left: none;
  }
  li:first-child {
    border-left: 1px solid rgba(56, 26, 13, 0.2);
  }
  li:hover {
    background-color: var(--light);
  }

  .selected {
    background-color: var(--light);
    box-shadow: inset 0 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: var(--text-size-4);
    padding-inline-start: 0;
  }
`;

interface OptionsSelectBarProps {
  shownOption: string;
  setShownOption: React.Dispatch<React.SetStateAction<string>>;
}

export function OptionsSelectBar({
  shownOption,
  setShownOption,
}: OptionsSelectBarProps) {
  return (
    <OptionsSelectBarStyle>
      <li
        className={shownOption === "PACE" ? "selected" : ""}
        onClick={() => {
          setShownOption("PACE");
        }}
      >
        Pace
      </li>
      <li
        className={shownOption === "GENRE" ? "selected" : ""}
        onClick={() => {
          setShownOption("GENRE");
        }}
      >
        Genre
      </li>
      <li
        className={shownOption === "SIMILAR_SONGS" ? "selected" : ""}
        onClick={() => {
          setShownOption("SIMILAR_SONGS");
        }}
      >
        Similar Songs
      </li>
    </OptionsSelectBarStyle>
  );
}
