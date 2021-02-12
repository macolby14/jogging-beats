import { useState } from "react";
import { Box } from "../components/Box";
import { Spacer } from "../components/Spacer";
import { BeatsInput } from "../components/BeatsInput";
import { PageHeader } from "../components/PageHeader";
import { BeatsResults } from "../components/BeatsResults";

export default function Home() {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [targetDuration, setTargetDuration] = useState(30 * 60 * 1000);

  function songResultsHandler(results: any) {
    console.log(`songResults:`);
    console.log(results);
    setRecommendations(results);
  }

  const displayComponent = !recommendations ? (
    <BeatsInput
      resultsHandler={songResultsHandler}
      targetDuration={targetDuration}
      setTargetDuration={setTargetDuration}
    />
  ) : (
    <BeatsResults
      recommendations={recommendations}
      targetDuration={targetDuration}
    />
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
