import { TrackData } from "../../components/Track";
import { authFetch } from "../authFetch";
import { getSeedSongsFromGenres } from "./genreUtils";
import { getRandomSpotifyTrackIds } from "./getRandomSpotifyTrackIds";

export async function fetchSongs(
  bpm: number,
  bpmTolerance: number,
  allowExplicit: boolean,
  selectedGenre: string,
  token: string
): Promise<TrackData[]> {
  const seedSongsFromGenres: string[] = [];
  const randomSeedSongs: string[] = [];
  const genreSeeds: string[] = [];

  // * If the user selects any, the seeds for the Spotify API Call are work-out and 4 random songs from popular work-out playlists
  if (selectedGenre === "any") {
    randomSeedSongs.push(...getRandomSpotifyTrackIds(4));
    genreSeeds.push("work-out");
  }
  // * If the user chooses a specific genre, the seed is the genre they choose and
  else {
    for (let i = 0; i < 5; i += 1) {
      seedSongsFromGenres.push(...getSeedSongsFromGenres([selectedGenre], 1));
    }
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
