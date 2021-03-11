import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { GenreOptions } from "../components/Options/GenreOptions";
import { OptionsSelectBar } from "../components/Options/OptionsSelectBar";
import { PaceOptions } from "../components/Options/PaceOptions";
import { Spacer } from "../components/Spacer";
import { useStickyState } from "../utils/useStickyState";

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
  const [bpm, setBpm] = useStickyState("160", "bpm");
  const [targetDuration, setTargetDuration] = useStickyState(
    30 * 60 * 1000,
    "targetDuration"
  );
  const [allowExplicit, setAllowExplict] = useStickyState(
    false,
    "allowExplicit"
  );
  const [selectedGenres, setSelectedGenres] = useStickyState(
    new Set<string>(),
    "selectedGenres"
  );
  const [shownOption, setShownOption] = useStickyState("PACE", "shownOption");

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    router.push(
      `/results?bpm=${bpm}&targetDuration=${targetDuration}&allowExplicit=${allowExplicit}&selectedGenres=${Array.from(
        selectedGenres
      ).join(",")}`
    );
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
          allowExplicit={allowExplicit}
          setAllowExplicit={setAllowExplict}
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
