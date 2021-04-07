import Image from "next/image";
import styled from "styled-components";
import { Heading } from "./Heading";

const HeroBoxStyle = styled.div`
  max-width: 1000px;
  width: 80%;
  display: flex;
  flex-direction: row;
  gap: 32px;

  img {
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const FlexColumnStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 32px;
`;

export function HeroBox() {
  return (
    <>
      <HeroBoxStyle>
        <div style={{ width: "100%" }}>
          <Image
            layout="responsive"
            src="/home-pic-1100px-688px.jpg"
            alt="Man running"
            height={688}
            width={1100}
          />
        </div>
        <FlexColumnStyle>
          <Heading level={5} textAlign="left">
            Syncing your run, ride, or workout can help you go further and
            faster.
          </Heading>
          <Heading level={5} textAlign="left">
            We can help you create a music playlist at the right tempo for your
            workout.
          </Heading>
          <Heading level={5} textAlign="left">
            Enter your running pace, workout intensity, or target beats per
            minute to start finding songs.
          </Heading>
        </FlexColumnStyle>
      </HeroBoxStyle>
    </>
  );
}
