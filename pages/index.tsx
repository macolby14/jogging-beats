import Head from "next/head";
import { Box } from "../components/Box";
import { Spacer } from "../components/Spacer";
import { Heading } from "../components/Heading";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jogging Beats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacer size={50} />
      <Box size={1280} gap={16}>
        <Heading level={1}>
          <em>Jogging</em> Beats
        </Heading>
      </Box>
    </>
  );
}
