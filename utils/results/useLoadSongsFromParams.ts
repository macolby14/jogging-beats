import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../components/context/TokenProvider";
import { TrackData } from "../../components/Track";
import { authFetch } from "../authFetch";

interface Props {
  bpmParam: string | string[] | undefined;
  targetDurationParam: string | string[] | undefined;
  setTargetDuration: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTracks: React.Dispatch<React.SetStateAction<TrackData[]>>;
}

export function useLoadSongsFromParams({
  bpmParam,
  targetDurationParam,
  setTargetDuration,
  setLoading,
  setTracks,
}: Props) {
  const token = useContext(TokenContext);

  async function fetchSongs(bpmAsNum: number): Promise<any> {
    if (bpmAsNum === undefined || Array.isArray(bpmAsNum)) {
      throw new Error("Fetching songs with invalid bpm");
    }
    const results = await authFetch({
      url: `https://api.spotify.com/v1/recommendations?market=US&seed_genres=work-out,pop,power-pop&target_tempo=${bpmAsNum}&min_tempo=${
        bpmAsNum - 5
      }&max_tempo=${bpmAsNum + 5}`,
      token,
    }).then((response) => response.json());
    return results;
  }

  useEffect(() => {
    if (
      bpmParam === undefined ||
      Array.isArray(bpmParam) ||
      targetDurationParam === undefined ||
      Array.isArray(targetDurationParam) ||
      !token
    ) {
      // Nothing - need to return from useEffect without cleanup
    } else {
      const bpmAsNum = parseInt(bpmParam, 10);
      const targetDurationAsNum = parseInt(targetDurationParam, 10);
      setTargetDuration(targetDurationAsNum);
      setLoading(true);
      fetchSongs(bpmAsNum).then(({ tracks: results }) => {
        setTracks(results);
        setLoading(false);
      });
    }
  }, [bpmParam, targetDurationParam, token]);
}
