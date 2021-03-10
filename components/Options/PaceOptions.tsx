import React, { useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { Spacer } from "../Spacer";

const PaceOptionsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  column-gap: 16px;
  row-gap: 16px;

  --p-top-bottom: 8px;
  --p-left-right: 4px;
  --basic-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  --basic-border: 1px solid rgba(0, 0, 0, 0.2);

  .dropdown {
    position: relative;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); */
    /* border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 8px 4px; */
  }

  .dropdown-selected {
    border: var(--basic-border);
    padding: var(--p-top-bottom) var(--p-left-right);
    box-shadow: var(--basic-shadow);
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: calc(100% + var(--p-top-bottom));
    left: 0%;
    box-sizing: border-box;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: var(--basic-shadow);
    z-index: 1;

    div:first-child {
      border-top: var(--basic-border);
    }

    div {
      white-space: nowrap;
      padding: var(--p-top-bottom) var(--p-left-right);
      border: var(--basic-border);
      border-top: none;
    }
  }

  .dropdown-selected:hover,
  .dropdown-content div:hover {
    cursor: pointer;
    border: 3px solid var(--light);
  }

  .dropdown-selected:hover + .dropdown-content div:first-child {
    border-top: 3px solid var(--light);
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-arrow {
    transition: opacity 250ms ease;
  }

  .dropdown:hover .dropdown-arrow {
    opacity: 0;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

interface PaceOptionsProps {
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  targetDuration: number;
  setTargetDuration: React.Dispatch<React.SetStateAction<number>>;
}

type OptionsType = "BPM" | "RUNNING" | "CYCLING" | "INTENSITY";

const optionToStringMap: Record<OptionsType, string> = {
  RUNNING: "Running Pace (min/mile)",
  CYCLING: "Cycling Pace (min/mile)",
  BPM: "Beats Per Minute",
  INTENSITY: "Workout Intensity",
};

export function PaceOptions({
  bpm,
  setBpm,
  targetDuration,
  setTargetDuration,
}: PaceOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<OptionsType>("RUNNING");

  function getNotSelectedOptions() {
    const mapCopy = { ...optionToStringMap };
    delete mapCopy[selectedOption];
    return Object.entries(mapCopy).map(([key, val]) => (
      <div
        key={key}
        role="button"
        onClick={() => {
          setSelectedOption(key as OptionsType);
        }}
      >
        {val}
      </div>
    ));
  }

  return (
    <PaceOptionsStyle>
      <label htmlFor="bpm">
        <span className="dropdown">
          <span className="dropdown-selected">
            {optionToStringMap[selectedOption]}
            <span className="dropdown-arrow">▼</span>
          </span>
          <div className="dropdown-content">{getNotSelectedOptions()}</div>
        </span>
      </label>
      <input
        type="number"
        name="bpm"
        value={bpm}
        onChange={(e) => setBpm(parseInt(e.target.value, 10))}
      />
      <Spacer size={50} />
      <label htmlFor="workoutTime">Workout Time (min)</label>
      <input
        type="number"
        name="workoutTime"
        value={Math.floor(targetDuration / 1000 / 60)}
        onChange={(e) =>
          setTargetDuration(parseInt(e.target.value, 10) * 60 * 1000)
        }
      />
      <Spacer size={50} />
    </PaceOptionsStyle>
  );
}
