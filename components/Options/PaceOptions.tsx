import React, { useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import {
  bpmToIntensity,
  bpmToRunningTime,
  intensityToBpm,
  runningTimeToBpm,
} from "../../utils/options/paceToBpm";
import { Spacer } from "../Spacer";

const PaceOptionsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) 50px;
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

type OptionType = "RUNNING" | "BPM" | "INTENSITY";

interface PaceOptionsProps {
  bpm: string;
  setBpm: React.Dispatch<React.SetStateAction<string>>;
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
  const [runningMin, setRunningMin] = useState("7");
  const [runningSec, setRunningSec] = useState("0");
  const [intensity, setIntensity] = useState("LOW");

  function bpmChange(inputBpm: string) {
    setBpm(inputBpm);
    let newBpm = parseInt(inputBpm, 10);
    newBpm = Number.isNaN(inputBpm) ? 0 : newBpm;
    const newTime = bpmToRunningTime(newBpm);
    setRunningMin(`${Math.trunc(newTime / 60)}`);
    setRunningSec(`${Math.round(newTime % 60)}`);
    setIntensity(bpmToIntensity(newBpm));
  }

  function handleBpmChange(e: React.ChangeEvent<HTMLInputElement>) {
    bpmChange(e.target.value);
  }

  function handleRunningTimeChangeMin(e: React.ChangeEvent<HTMLInputElement>) {
    setRunningMin(e.target.value);
    let newMin = Number.parseInt(e.target.value, 10);
    let oldSec = Number.parseInt(runningSec, 10);
    newMin = Number.isNaN(newMin) ? 0 : newMin;
    oldSec = Number.isNaN(oldSec) ? 0 : oldSec;
    const newBpm = runningTimeToBpm(newMin, oldSec);
    setBpm(`${newBpm}`);
    setIntensity(bpmToIntensity(newBpm));
  }

  function handleRunningTimeChangeSec(e: React.ChangeEvent<HTMLInputElement>) {
    setRunningSec(e.target.value);
    let newSec = Number.parseInt(e.target.value, 10);
    let oldMin = Number.parseInt(runningSec, 10);
    newSec = Number.isNaN(newSec) ? 0 : newSec;
    oldMin = Number.isNaN(oldMin) ? 0 : oldMin;
    const newBpm = runningTimeToBpm(oldMin, newSec);
    setBpm(`${newBpm}`);
    setIntensity(bpmToIntensity(newBpm));
  }

  function handleIntensityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newBpm = `${intensityToBpm(e.target.value)}`;
    bpmChange(newBpm);
  }

  function optionChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(e.target.value as OptionType);
  }

  function paceInputOptions() {
    switch (selectedOption) {
      case "RUNNING":
        return (
          <FlexRowStyle>
            <FlexRowStyle>
              <input
                type="text"
                value={runningMin}
                onChange={handleRunningTimeChangeMin}
                size={4}
              />
              min
            </FlexRowStyle>
            <FlexRowStyle>
              <input
                type="text"
                value={runningSec}
                onChange={handleRunningTimeChangeSec}
                size={4}
              />
              sec
            </FlexRowStyle>
          </FlexRowStyle>
        );
      case "INTENSITY":
        return (
          <select
            name="intensity"
            id="intensity"
            onChange={handleIntensityChange}
            value={intensity}
          >
            <option value="LOW">Low</option>
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
            onChange={handleBpmChange}
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
