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
    </PaceOptionsStyle>
  );
}

function GenreOptions() {
  return <div>Genre Options</div>;
}

const OptionsSelectBarStyle = styled.ul`
  li {
    display: inline;
    text-decoration: none;
    padding: 16px;
  }
`;

interface OptionsSelectBarProps {
  setShownOption: React.Dispatch<React.SetStateAction<string>>;
}

function OptionsSelectBar({ setShownOption }: OptionsSelectBarProps) {
  return (
    <OptionsSelectBarStyle>
      <li>
        <button
          type="button"
          onClick={() => {
            setShownOption("PACE");
          }}
        >
          Pace
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            setShownOption("GENRE");
          }}
        >
          Genre
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            setShownOption("SIMILAR_SONGS");
          }}
        >
          Similar Songs
        </button>
      </li>
    </OptionsSelectBarStyle>
  );
}

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bpm, setBpm] = useState(170);
  const [targetDuration, setTargetDuration] = useState(10 * 60 * 1000);
  const [shownOption, setShownOption] = useState("pace");

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    router.push(`/results?bpm=${bpm}&targetDuration=${targetDuration}`);
  }

  let displayOption: any = null;
  switch (shownOption) {
    case "GENRE":
      displayOption = <GenreOptions />;
      break;
    case "SIMILAR_SONGS":
      displayOption = <div>Similar Songs</div>;
      break;
    case "PACE":
    default:
      displayOption = (
        <PaceOptions
          bpm={bpm}
          setBpm={setBpm}
          targetDuration={targetDuration}
          setTargetDuration={setTargetDuration}
        />
      );
  }

  const inputForm = (
    <FormStyle onSubmit={handleSubmission}>
      <OptionsSelectBar setShownOption={setShownOption} />
      {displayOption}
      <input type="submit" value="Search" />
    </FormStyle>
  );

  const displayComp = loading ? <div>Loading...</div> : inputForm;

  return <Style>{displayComp}</Style>;
}
