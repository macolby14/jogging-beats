import Head from "next/head";
import { Box } from "../components/Box";
import { Spacer } from "../components/Spacer";
import { Heading } from "../components/Heading";
import { BeatsInput } from "../components/BeatsInput";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jogging Beats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacer size={50} />
      <Box size={1280} gap={16}>
        <Heading level={1} weight={700}>
          <em>Jogging</em> Beats
        </Heading>
        <Heading level={4}>
          Find the perfect playlist for your run or ride
        </Heading>
        <Spacer size={16} />
        <BeatsInput />
      </Box>
    </>
  );
}
