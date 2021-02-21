import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { Heading } from "./Heading";

const OptionsSelectionStyle = styled.div`
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

export function OptionsSelection() {
  const [pace, setPace] = useState("0");
  const [bpm, setBpm] = useState(170);
  const [targetDuration, setTargetDuration] = useState(10 * 60 * 1000);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    router.push(`/results?bpm=${bpm}&targetDuration=${targetDuration}`);
  }

  const inputForm = (
    <>
      <InputOptions>
        <InputOption>
          <Heading level={4}>Target Pace</Heading>
        </InputOption>
        <InputOption>
          <Heading level={4}>Target Beats Per Minute (BPM)</Heading>
        </InputOption>
      </InputOptions>
      <FormStyle onSubmit={handleSubmission}>
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
          onChange={(e) => setBpm(parseInt(e.target.value, 10))}
        />
        <label htmlFor="workoutTime">Workout Time (min)</label>
        <input
          type="number"
          name="workoutTime"
          value={Math.floor(targetDuration / 1000 / 60)}
          onChange={(e) =>
            setTargetDuration(parseInt(e.target.value, 10) * 60 * 1000)
          }
        />
        <input type="submit" value="Search" />
      </FormStyle>
    </>
  );

  const displayComp = loading ? <div>Loading...</div> : inputForm;

  return <OptionsSelectionStyle>{displayComp}</OptionsSelectionStyle>;
}
