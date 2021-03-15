import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../components/context/TokenProvider";
import { TrackData } from "../../components/Track";
import { fetchSongs } from "./fetchSongs";

interface Props {
  bpm: number;
  allowExplicit: boolean;
  selectedGenres: Record<string, boolean>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTracks: React.Dispatch<React.SetStateAction<TrackData[]>>;
}

export function useInitialLoadSongs({
  bpm,
  allowExplicit,
  selectedGenres,
  setLoading,
  setTracks,
}: Props) {
  const token = useContext(TokenContext);

  useEffect(() => {
    if (!token) {
      return;
    }
    setLoading(true);
    fetchSongs(bpm, 5, allowExplicit, Object.keys(selectedGenres), token).then(
      (results: TrackData[]) => {
        setTracks(results);
        setLoading(false);
      }
    );
  }, [token]);
}