import { useState } from "react";
import { Box } from "../components/Box";
import { Spacer } from "../components/Spacer";
import { BeatsInput } from "../components/BeatsInput";
import { PageHeader } from "../components/PageHeader";
import { Results } from "../components/Results/Results";

export default function Home() {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [targetDuration, setTargetDuration] = useState(30 * 60 * 1000);

  const displayComponent = !recommendations ? (
    <BeatsInput
      resultsHandler={setRecommendations}
      targetDuration={targetDuration}
      setTargetDuration={setTargetDuration}
    />
  ) : (
    <Results
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
