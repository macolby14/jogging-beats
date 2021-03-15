import { TrackData } from "../../components/Track";
import { authFetch } from "../authFetch";
import { getSeedSongsFromGenres } from "./genreUtils";
import { getRandomSpotifyTrackIds } from "./getRandomSpotifyTrackIds";

export async function fetchSongs(
  bpm: number,
  bpmTolerance: number,
  allowExplicit: boolean,
  selectedGenres: string[],
  token: string
): Promise<TrackData[]> {
  const seedSongsFromGenres: string[] = [];
  const randomSeedSongs: string[] = [];
  const genreSeeds: string[] = [];
  if (selectedGenres.length === 1) {
    for (let i = 0; i < 5; i += 1) {
      seedSongsFromGenres.push(...getSeedSongsFromGenres(selectedGenres, 1));
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

  const seedTracks = seedSongsFromGenres.concat(randomSeedSongs);
  const seedTrackString = seedTracks.join(",");
  const selectedGenresString = genreSeeds.join(",");

  const results = await authFetch({
    url: `https://api.spotify.com/v1/recommendations?market=US&seed_genres=${selectedGenresString}&seed_tracks=${seedTrackString}&min_popularity=25&min_energy=0.25&target_tempo=${bpm}&min_tempo=${
      bpm - bpmTolerance
    }&max_tempo=${bpm + bpmTolerance}`,
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
