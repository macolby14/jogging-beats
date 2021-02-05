import { useState } from "react";
import styled from "styled-components";
import { Heading } from "./Heading";

const BeatsInputStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const InputOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const InputOption = styled.div`
  background-color: red;
  border: 1px solid black;
  padding: 0 16px 0 16px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormStyle = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;

  input[type="number"] {
    background-color: inherit;
  }
`;

export function BeatsInput() {
  const [pace, setPace] = useState("0");
  const [bpm, setBpm] = useState("0");
  const [time, setTime] = useState("0");

  return (
    <BeatsInputStyle>
      <InputOptions>
        <InputOption>
          <Heading level={4}>Target Pace</Heading>
        </InputOption>
        <InputOption>
          <Heading level={4}>Target Beats Per Minute (BPM)</Heading>
        </InputOption>
      </InputOptions>
      <FormStyle>
        <label htmlFor="pace">Pace</label>
        <input
          type="number"
          name="pace"
          value={pace}
          onChange={(e) => setPace(e.target.value)}
        />
        <label htmlFor="bpm">Beats per Minute</label>
        <input
          type="number"
          name="bpm"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)}
        />
        <label htmlFor="workoutTime">Total Workout Time</label>
        <input
          type="number"
          name="workoutTime"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </FormStyle>
    </BeatsInputStyle>
  );
}
