import { useState } from "react";
import { OptionsSelection } from "../components/OptionsSelection";
import { Results } from "../components/Results/Results";

export default function Home() {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [targetDuration, setTargetDuration] = useState(30 * 60 * 1000);

  const displayComponent = !recommendations ? (
    <OptionsSelection
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

  return <>{displayComponent}</>;
}
