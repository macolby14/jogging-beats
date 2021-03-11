import React, { useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { Spacer } from "../Spacer";

const PaceOptionsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  column-gap: 16px;
  row-gap: 16px;
  font-size: var(--text-size-4);

  input,
  select {
    font-family: inherit;
    font-size: inherit;
  }

  select {
    width: auto;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const FlexRowStyle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  input {
    text-align: right;
  }
`;

type OptionType = "RUNNING" | "CYCLING" | "BPM" | "INTENSITY";

interface PaceOptionsProps {
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  targetDuration: number;
  setTargetDuration: React.Dispatch<React.SetStateAction<number>>;
}

export function PaceOptions({
  bpm,
  setBpm,
  targetDuration,
  setTargetDuration,
}: PaceOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<OptionType>("RUNNING");

  function optionChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(e.target.value as OptionType);
  }

  function paceInputOptions() {
    switch (selectedOption) {
      case "CYCLING":
      case "RUNNING":
        return (
          <FlexRowStyle>
            <FlexRowStyle>
              <input type="text" />
              min
            </FlexRowStyle>
            <FlexRowStyle>
              <input type="text" />
              sec
            </FlexRowStyle>
          </FlexRowStyle>
        );
      case "INTENSITY":
        return (
          <select name="intensity" id="intensity">
            <option value="LOW">Relaxed</option>
            <option value="MODERATE_LOW">Moderate Low</option>
            <option value="MODERATE">Moderate</option>
            <option value="MODERATE_HIGH">Moderate High</option>
            <option value="HIGH">High</option>
          </select>
        );
      case "BPM":
        return (
          <input
            type="number"
            name="pace"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value, 10))}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  }

  return (
    <PaceOptionsStyle>
      <label htmlFor="pace">
        <select
          name="paceOptions"
          id="paceOptions"
          onChange={optionChangeHandler}
        >
          <option value="RUNNING">Running Pace</option>
          <option value="CYCLING">Cycling Pace</option>
          <option value="BPM">Beats Per Minute</option>
          <option value="INTENSITY">Workout Intensity</option>
        </select>
      </label>
      {paceInputOptions()}
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
