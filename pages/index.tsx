import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useContext, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { SettingsContext } from "../components/context/SettingsProvider";
import { GenreOptions } from "../components/Options/GenreOptions";
import { OptionsSelectBar } from "../components/Options/OptionsSelectBar";
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
  border: 1px solid var(--dark);
  width: 60vw;

  @media (max-width: 1000px) {
    width: 80vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    bpm: [bpm, setBpm],
    targetDuration: [targetDuration, setTargetDuration],
    allowExplicit: [allowExplicit, setAllowExplicit],
    selectedGenres: [selectedGenres, setSelectedGenres],
    shownOption: [shownOption, setShownOption],
  } = useContext(SettingsContext);

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    router.push(`/results`);
  }

  let displayOption: any = null;
  switch (shownOption) {
    case "GENRE":
      displayOption = (
        <GenreOptions
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      );
      break;
    case "PACE":
    default:
      displayOption = (
        <PaceOptions
          bpm={bpm}
          setBpm={setBpm}
          targetDuration={targetDuration}
          setTargetDuration={setTargetDuration}
          allowExplicit={allowExplicit}
          setAllowExplicit={setAllowExplicit}
        />
      );
  }

  const inputForm = (
    <FormStyle onSubmit={handleSubmission}>
      <OptionsSelectBar
        shownOption={shownOption}
        setShownOption={setShownOption}
      />
      {displayOption}
      <input type="submit" value="Search" />
      <Spacer size={16} />
    </FormStyle>
  );

  const displayComp = loading ? <div>Loading...</div> : inputForm;

  return <Style>{displayComp}</Style>;
}
