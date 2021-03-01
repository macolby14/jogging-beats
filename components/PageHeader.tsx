import styled from "styled-components";
import { Heading } from "./Heading";
import { Spacer } from "./Spacer";

const Style = styled.a`
  .tiltLeft {
    transform: rotate(-5deg);
  }
  .tiltRight {
    transform: rotate(15deg);
  }
`;

export function PageHeader() {
  return (
    <Style href="/">
      <Heading level={1} weight={700}>
        <img
          className="tiltRight"
          src="/music-note-47px.svg"
          alt="Music Note"
        />
        <Spacer axis="horizontal" size={10} />
        Jogging Beats
        <Spacer axis="horizontal" size={5} />
        <img className="tiltLeft" src="/music-note-47px.svg" alt="Music Note" />
      </Heading>
      <Heading level={4}>
        <em>Create the perfect playlist on demand for your run or ride</em>
      </Heading>
    </Style>
  );
}
