import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useContext } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";

import { SettingsContext } from "../components/context/SettingsProvider";
import { PaceOptions } from "../components/Options/PaceOptions";
import { Spacer } from "../components/Spacer";

const Style = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  /* border: 2px solid var(--dark); */
  width: 60vw;
  font-weight: var(--font-weight-semi-bold);
  @media (max-width: 1000px) {
    width: 80vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export default function Search() {
  const router = useRouter();

  const {
    bpm: [bpm, setBpm],
    bpmTolerance: [bpmTolerance, setBpmTolerance],
    targetDuration: [targetDuration, setTargetDuration],
    allowExplicit: [allowExplicit, setAllowExplicit],
    selectedGenre: [selectedGenre, setSelectedGenre],
  } = useContext(SettingsContext);

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    router.push(`/results`);
  }

  const displayOption = (
    <PaceOptions
      bpm={bpm}
      setBpm={setBpm}
      bpmTolerance={bpmTolerance}
      setBpmTolerance={setBpmTolerance}
      targetDuration={targetDuration}
      setTargetDuration={setTargetDuration}
      allowExplicit={allowExplicit}
      setAllowExplicit={setAllowExplicit}
      selectedGenre={selectedGenre}
      setSelectedGenre={setSelectedGenre}
    />
  );

  const inputForm = (
    <FormStyle onSubmit={handleSubmission} id="inputForm">
      {displayOption}
      <input type="submit" value="Search" />
      <Spacer size={16} />
    </FormStyle>
  );

  return <Style>{inputForm}</Style>;
}
