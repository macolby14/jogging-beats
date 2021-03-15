import React, { useContext, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import {
  bpmToIntensity,
  bpmToRunningTime,
  intensityToBpm,
  runningTimeToBpm,
} from "../../utils/options/paceToBpm";
import { SettingsContext, OptionType } from "../context/SettingsProvider";
import { Spacer } from "../Spacer";

const PaceOptionsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 16px;
  font-size: var(--text-size-4);

  input[type="checkbox"] {
    transform: scale(3.5);
  }

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

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px;
    gap: 4px;
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

const FlexCheckbox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

interface PaceOptionsProps {
  bpm: string;
  setBpm: React.Dispatch<React.SetStateAction<string>>;
  targetDuration: number;
  setTargetDuration: React.Dispatch<React.SetStateAction<number>>;
  allowExplicit: boolean;
  setAllowExplicit: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PaceOptions({
  bpm,
  setBpm,
  targetDuration,
  setTargetDuration,
  allowExplicit,
  setAllowExplicit,
}: PaceOptionsProps) {
  const {
    selectedOption: [selectedOption, setSelectedOption],
  } = useContext(SettingsContext);
  const [runningMin, setRunningMin] = useState(
    `${Math.trunc(bpmToRunningTime(parseInt(bpm, 10)) / 60)}`
  );
  const [runningSec, setRunningSec] = useState(
    `${Math.round(bpmToRunningTime(parseInt(bpm, 10)) % 60)}`
  );
  const [intensity, setIntensity] = useState(bpmToIntensity(parseInt(bpm, 10)));

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
    let oldMin = Number.parseInt(runningMin, 10);
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
      <label htmlFor="paceOptions">
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
      <label htmlFor="workoutTime">Workout Time (min)</label>
      <input
        type="number"
        name="workoutTime"
        value={Math.floor(targetDuration / 1000 / 60)}
        onChange={(e) =>
          setTargetDuration(parseInt(e.target.value, 10) * 60 * 1000)
        }
      />
      <label htmlFor="allowExplicit">Allow Explicit Songs?</label>
      <FlexCheckbox>
        <Spacer size={8} />
        <input
          type="checkbox"
          name="allowExplicit"
          value="allowExplicit"
          checked={allowExplicit}
          onChange={(e) => setAllowExplicit(e.target.checked)}
        />
      </FlexCheckbox>
    </PaceOptionsStyle>
  );
}
