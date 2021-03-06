import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";

const OptionsSelectBarStyle = styled.ul`
  li {
    display: inline;
    text-decoration: none;
    padding: 16px;
  }
`;

interface OptionsSelectBarProps {
  setShownOption: React.Dispatch<React.SetStateAction<string>>;
}

export function OptionsSelectBar({ setShownOption }: OptionsSelectBarProps) {
  return (
    <OptionsSelectBarStyle>
      <li>
        <button
          type="button"
          onClick={() => {
            setShownOption("PACE");
          }}
        >
          Pace
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            setShownOption("GENRE");
          }}
        >
          Genre
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            setShownOption("SIMILAR_SONGS");
          }}
        >
          Similar Songs
        </button>
      </li>
    </OptionsSelectBarStyle>
  );
}
