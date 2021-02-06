import { useState } from "react";
import { Box } from "../components/Box";
import { Spacer } from "../components/Spacer";
import { BeatsInput } from "../components/BeatsInput";
import { PageHeader } from "../components/PageHeader";
import { BeatsResults } from "../components/BeatsResults";

export default function Home() {
  const [tracks, setTracks] = useState<any>(null);

  function songResultsHandler(results: any) {
    console.log(`songResults:`);
    console.log(results);
    setTracks(results);
  }

  const displayComponent = !tracks ? (
    <BeatsInput resultsHandler={songResultsHandler} />
  ) : (
    <BeatsResults tracks={tracks} />
  );

  return (
    <>
      <Spacer size={50} />
      <Box size={1280} gap={16}>
        <PageHeader />
        <Spacer size={16} />
        {displayComponent}
      </Box>
    </>
  );
}
