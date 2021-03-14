import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../components/context/TokenProvider";
import { TrackData } from "../../components/Track";
import { fetchSongs } from "./fetchSongs";

interface Props {
  bpmParam: string | string[] | undefined;
  targetDurationParam: string | string[] | undefined;
  allowExplicitParam: string | string[] | undefined;
  selectedGenresParam: string | string[] | undefined;
  setTargetDuration: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTracks: React.Dispatch<React.SetStateAction<TrackData[]>>;
}

export function useLoadSongsFromParams({
  bpmParam,
  targetDurationParam,
  allowExplicitParam,
  selectedGenresParam,
  setTargetDuration,
  setLoading,
  setTracks,
}: Props) {
  const token = useContext(TokenContext);

  useEffect(() => {
    if (
      bpmParam === undefined ||
      allowExplicitParam === undefined ||
      Array.isArray(bpmParam) ||
      targetDurationParam === undefined ||
      Array.isArray(targetDurationParam) ||
      selectedGenresParam === undefined ||
      Array.isArray(selectedGenresParam) ||
      !token
    ) {
      // Nothing - need to return from useEffect without cleanup
    } else {
      const bpmAsNum = parseInt(bpmParam, 10);
      const targetDurationAsNum = parseInt(targetDurationParam, 10);
      const allowExplicit = allowExplicitParam === "true";
      const selectedGenres =
        selectedGenresParam === "" ? [] : selectedGenresParam.split(",");
      setTargetDuration(targetDurationAsNum);
      setLoading(true);
      fetchSongs(bpmAsNum, 5, allowExplicit, selectedGenres, token).then(
        (results) => {
          setTracks(results);
          setLoading(false);
        }
      );
    }
  }, [
    bpmParam,
    targetDurationParam,
    allowExplicitParam,
    selectedGenresParam,
    token,
  ]);
}
