import { FormEvent, useContext, useState } from "react";
import styled from "styled-components";
import { Heading } from "./Heading";
import { TokenContext } from "./TokenProvider";

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

async function fetchSongs(
  token: string,
  bpm: string,
  time: string
): Promise<string> {
  const results = await fetch(
    "https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
  return results;
}

interface BeatsInputProps {
  resultsHandler: Function;
}

export function BeatsInput({ resultsHandler }: BeatsInputProps) {
  const [pace, setPace] = useState("0");
  const [bpm, setBpm] = useState("0");
  const [time, setTime] = useState("0");
  const [loading, setLoading] = useState(false);
  const token = useContext(TokenContext);

  console.log(`Beat Inputs has the token ${token}`);

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const results = await fetchSongs(token, bpm, time);
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
          onChange={(e) => setBpm(e.target.value)}
        />
        <label htmlFor="workoutTime">Total Workout Time</label>
        <input
          type="number"
          name="workoutTime"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input type="submit" value="Search" />
      </FormStyle>
    </>
  );

  const displayComp = loading ? <div>Loading...</div> : inputForm;

  return <BeatsInputStyle>{displayComp}</BeatsInputStyle>;
}
