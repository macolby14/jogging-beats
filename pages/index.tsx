import { useRouter } from "next/dist/client/router";
import React, { FormEvent, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { GenreOptions } from "../components/Options/GenreOptions";
import { OptionsSelectBar } from "../components/Options/OptionsSelectBar";
import { PaceOptions } from "../components/Options/PaceOptions";

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
