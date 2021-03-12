import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../components/context/TokenProvider";
import { TrackData } from "../../components/Track";
import { authFetch } from "../authFetch";
import { getSeedSongsFromGenres } from "./genreUtils";
import { getRandomSpotifyTrackIds } from "./getRandomSpotifyTrackIds";

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
  const bpmTolerance = 5;

  async function fetchSongs(
    bpmAsNum: number,
    allowExplicit: boolean,
    selectedGenres: string[]
  ): Promise<any> {
    if (bpmAsNum === undefined || Array.isArray(bpmAsNum)) {
      throw new Error("Fetching songs with invalid bpm");
    }

    console.log(selectedGenres);
    console.log(selectedGenres.length);

    const seedSongsFromGenres: string[] = [];
    const randomSeedSongs: string[] = [];
    const genreSeeds: string[] = [];
    if (selectedGenres.length === 1) {
      for (let i = 0; i < 5; i += 1) {
        console.log("Adding songs to seedSongsFromGenres");
        seedSongsFromGenres.push(...getSeedSongsFromGenres(selectedGenres, 1));
        console.log(seedSongsFromGenres);
      }
    } else if (selectedGenres.length === 2) {
      for (let i = 0; i < 2; i += 1) {
        seedSongsFromGenres.push(...getSeedSongsFromGenres(selectedGenres, 2));
      }
    } else if (selectedGenres.length > 2) {
      seedSongsFromGenres.push(...getSeedSongsFromGenres(selectedGenres, 5));
    } else {
      randomSeedSongs.push(...getRandomSpotifyTrackIds(4));
      genreSeeds.push("work-out");
    }

    console.log("Final seedSongsFromGenres");
    console.log(seedSongsFromGenres);

    const seedTracks = seedSongsFromGenres.concat(randomSeedSongs);
    const seedTrackString = seedTracks.join(",");
    const selectedGenresString = genreSeeds.join(",");

    const results = await authFetch({
      url: `https://api.spotify.com/v1/recommendations?market=US&seed_genres=${selectedGenresString}&seed_tracks=${seedTrackString}&min_popularity=25&min_energy=0.25&target_tempo=${bpmAsNum}&min_tempo=${
        bpmAsNum - bpmTolerance
      }&max_tempo=${bpmAsNum + bpmTolerance}`,
      token,
    }).then((response) => response.json());
    const tracks = (results.tracks as TrackData[]).filter((track) => {
      if (!allowExplicit) {
        return !track.explicit;
      }
      return true;
    });
    return tracks;
  }

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
      const selectedGenres = selectedGenresParam.split(",");
      setTargetDuration(targetDurationAsNum);
      setLoading(true);
      fetchSongs(bpmAsNum, allowExplicit, selectedGenres).then((results) => {
        setTracks(results);
        setLoading(false);
      });
    }
  }, [
    bpmParam,
    targetDurationParam,
    allowExplicitParam,
    selectedGenresParam,
    token,
  ]);
}
