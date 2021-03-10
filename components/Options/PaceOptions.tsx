import React, { useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { Spacer } from "../Spacer";

const PaceOptionsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  column-gap: 16px;
  row-gap: 16px;

  select {
    font-family: inherit;
    font-size: inherit;
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

export function PaceOptions({
  bpm,
  setBpm,
  targetDuration,
  setTargetDuration,
}: PaceOptionsProps) {
  return (
    <PaceOptionsStyle>
      <label htmlFor="bpm">
        <select name="paceOptions" id="paceOptions">
          <option>Running Pace</option>
          <option>Cycling Pace</option>
          <option>Beats Per Minute</option>
          <option>Workout Intensity</option>
        </select>
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
