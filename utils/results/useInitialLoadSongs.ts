import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../components/context/TokenProvider";
import { TrackData } from "../../components/Track";
import { fetchSongs } from "./fetchSongs";

interface Props {
  bpm: number;
  bpmTolerance: number;
  allowExplicit: boolean;
  selectedGenre: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTracks: React.Dispatch<React.SetStateAction<TrackData[]>>;
}

export function useInitialLoadSongs({
  bpm,
  bpmTolerance,
  allowExplicit,
  selectedGenre,
  setLoading,
  setTracks,
}: Props) {
  const token = useContext(TokenContext);

  useEffect(() => {
    if (!token) {
      return;
    }
    setLoading(true);
    fetchSongs(bpm, bpmTolerance, allowExplicit, selectedGenre, token).then(
      (results: TrackData[]) => {
        setTracks(results);
        setLoading(false);
      }
    );
  }, [token]);
}
