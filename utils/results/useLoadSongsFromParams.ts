import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../components/context/TokenProvider";
import { TrackData } from "../../components/Track";
import { authFetch } from "../authFetch";
import { getRandomSpotifyTrackIds } from "./getRandomSpotifyTrackIds";

interface Props {
  bpmParam: string | string[] | undefined;
  targetDurationParam: string | string[] | undefined;
  allowExplicitParam: string | string[] | undefined;
  setTargetDuration: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTracks: React.Dispatch<React.SetStateAction<TrackData[]>>;
}

export function useLoadSongsFromParams({
  bpmParam,
  targetDurationParam,
  allowExplicitParam,
  setTargetDuration,
  setLoading,
  setTracks,
}: Props) {
  const token = useContext(TokenContext);
  const bpmTolerance = 3;

  async function fetchSongs(
    bpmAsNum: number,
    allowExplicit: boolean
  ): Promise<any> {
    if (bpmAsNum === undefined || Array.isArray(bpmAsNum)) {
      throw new Error("Fetching songs with invalid bpm");
    }

    const seedTrackString = getRandomSpotifyTrackIds(4).join(",");

    const results = await authFetch({
      url: `https://api.spotify.com/v1/recommendations?market=US&seed_genres=work-out&seed_tracks=${seedTrackString}&min_popularity=25&min_energy=0.25&target_tempo=${bpmAsNum}&min_tempo=${
        bpmAsNum - bpmTolerance
      }&max_tempo=${bpmAsNum + bpmTolerance}`,
      token,
    }).then((response) => response.json());
    console.log(allowExplicit);
    const tracks = (results.tracks as TrackData[]).filter((track) => {
      console.log(track);
      if (!allowExplicit) {
        return !track.explicit;
      }
      return true;
    });
    console.log(tracks);
    return tracks;
  }

  useEffect(() => {
    if (
      bpmParam === undefined ||
      allowExplicitParam === undefined ||
      Array.isArray(bpmParam) ||
      targetDurationParam === undefined ||
      Array.isArray(targetDurationParam) ||
      !token
    ) {
      // Nothing - need to return from useEffect without cleanup
    } else {
      const bpmAsNum = parseInt(bpmParam, 10);
      const targetDurationAsNum = parseInt(targetDurationParam, 10);
      const allowExplicit = allowExplicitParam === "true";
      setTargetDuration(targetDurationAsNum);
      setLoading(true);
      fetchSongs(bpmAsNum, allowExplicit).then((results) => {
        setTracks(results);
        setLoading(false);
      });
    }
  }, [bpmParam, targetDurationParam, allowExplicitParam, token]);
}
