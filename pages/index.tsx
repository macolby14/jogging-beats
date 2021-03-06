import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";

const Style = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const PaceOptionsStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;

  label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  input[type="submit"] {
    grid-column: auto / span 2;
    margin: auto;
    width: 200px;
  }
`;

interface PaceOptionsProps {
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  targetDuration: number;
  setTargetDuration: React.Dispatch<React.SetStateAction<number>>;
}

function PaceOptions({
  bpm,
  setBpm,
  targetDuration,
  setTargetDuration,
}: PaceOptionsProps) {
  return (
    <PaceOptionsStyle>
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
    </PaceOptionsStyle>
  );
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bpm, setBpm] = useState(170);
  const [targetDuration, setTargetDuration] = useState(10 * 60 * 1000);

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    router.push(`/results?bpm=${bpm}&targetDuration=${targetDuration}`);
  }

  const inputForm = (
    <form onSubmit={handleSubmission}>
      <PaceOptions
        bpm={bpm}
        setBpm={setBpm}
        targetDuration={targetDuration}
        setTargetDuration={setTargetDuration}
      />
    </form>
  );

  const displayComp = loading ? <div>Loading...</div> : inputForm;

  return <Style>{displayComp}</Style>;
}
