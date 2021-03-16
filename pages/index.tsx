import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useContext, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import Image from "next/image";
import { SettingsContext } from "../components/context/SettingsProvider";
import { GenreOptions } from "../components/Options/GenreOptions";
import { OptionsSelectBar } from "../components/Options/OptionsSelectBar";
import { PaceOptions } from "../components/Options/PaceOptions";
import { Spacer } from "../components/Spacer";
import { Heading } from "../components/Heading";

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
  border: 2px solid var(--dark);
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
    bpmTolerance: [bpmTolerance, setBpmTolerance],
    targetDuration: [targetDuration, setTargetDuration],
    allowExplicit: [allowExplicit, setAllowExplicit],
    selectedGenres: [selectedGenres, setSelectedGenres],
    optionsBarOtpion: [optionsBarOption, setOptionsBarOption],
  } = useContext(SettingsContext);

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    router.push(`/results`);
  }

  let displayOption: any = null;
  switch (optionsBarOption) {
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
          bpmTolerance={bpmTolerance}
          setBpmTolerance={setBpmTolerance}
          targetDuration={targetDuration}
          setTargetDuration={setTargetDuration}
          allowExplicit={allowExplicit}
          setAllowExplicit={setAllowExplicit}
        />
      );
  }

  const inputForm = (
    <FormStyle onSubmit={handleSubmission} id="inputForm">
      <OptionsSelectBar
        shownOption={optionsBarOption}
        setShownOption={setOptionsBarOption}
      />
      {displayOption}
      <input type="submit" value="Search" />
      <Spacer size={16} />
    </FormStyle>
  );

  const display = loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div
        style={{
          maxWidth: "700px",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "100%" }}>
          <Image
            layout="responsive"
            src="/home-pic-1100px-688px.jpg"
            alt="Man running"
            height={688}
            width={1100}
          />
        </div>
        <Spacer size={16} />
        <Heading level={5} textAlign="left">
          Syncing your run, ride, or workout can help you go further and faster.
        </Heading>
        <Spacer size={8} />
        <Heading level={5} textAlign="left">
          We can help you create a music playlist at the right tempo for your
          workout.
        </Heading>
        <Spacer size={16} />
        <Heading level={4}>Let&apos;s get started ▼</Heading>
      </div>
      {inputForm}
    </>
  );

  return <Style>{display}</Style>;
}
