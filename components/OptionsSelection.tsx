// eslint-disable-next-line no-use-before-define
import React, { FormEvent, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import { authFetch } from "../utilities/authFetch";
import { TokenContext } from "./context/TokenProvider";
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

interface OptionsSelectionProps {
  resultsHandler: Function;
  targetDuration: number;
  setTargetDuration: React.Dispatch<SetStateAction<number>>;
}

export function OptionsSelection({
  resultsHandler,
  targetDuration,
  setTargetDuration,
}: OptionsSelectionProps) {
  const token = useContext(TokenContext);
  const [pace, setPace] = useState("0");
  const [bpm, setBpm] = useState(170);
  const [loading, setLoading] = useState(false);

  async function fetchSongs(): Promise<string> {
    const results = await authFetch({
      url: `https://api.spotify.com/v1/recommendations?market=US&seed_genres=work-out,pop,power-pop&target_tempo=${bpm}&min_tempo=${
        bpm - 5
      }&max_tempo=${bpm + 5}`,
      token,
    }).then((response) => response.json());
    return results;
  }

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const results = await fetchSongs();
    setLoading(false);
    resultsHandler(results);
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
