import { useState } from "react";
import { Box } from "../components/Box";
import { Spacer } from "../components/Spacer";
import { BeatsInput } from "../components/BeatsInput";
import { PageHeader } from "../components/PageHeader";
import { BeatsResults } from "../components/BeatsResults";

export default function Home() {
  const [hasResults, setHasResults] = useState(false);

  function songResultsHandler(s: string) {
    setHasResults(true);
    console.log(`songResults: ${s}`);
  }

  const displayComponent = !hasResults ? (
    <BeatsInput resultsHandler={songResultsHandler} />
  ) : (
    <BeatsResults />
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
