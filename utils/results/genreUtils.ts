import { popularSongsGenreMap } from "./data/popularSongsGenreMap";

const allGenres = [
  "pop",
  "rock",
  "dance",
  "metal",
  "latin",
  "house",
  "electro",
  "edm",
  "country",
  "indie",
  "alt-rock",
  "reggae",
  "hardcore",
  "folk",
  "soul",
  "punk",
  "funk",
  "emo",
  "cantopop",
  "chicago-house",
  "grunge",
  "chill",
  "death-metal",
  "trance",
  "groove",
  "industrial",
  "disco",
  "dub",
  "german",
  "garage",
  "british",
  "french",
  "k-pop",
];

export function getAllGenres() {
  return allGenres;
}

export function getNGenres(n: number) {
  return allGenres.slice(0, n);
}

// * This function can support multiple genres, however, currently only one is used
// * Chooses random songs for the chosen genres. Currently only choses 1 random song per genre selected as a seed
export function getSeedSongsFromGenres(genres: string[], max: number) {
  const chosenGenres: string[] = [];
  const genresCopy = [...genres];

  // Chooses up to max # of genres from genres and puts them into chosenGenres
  while (chosenGenres.length < max && genresCopy.length > 0) {
    const randomGenreInd = Math.floor(Math.random() * genresCopy.length);
    const removedGenre = genresCopy.splice(randomGenreInd, 1)[0];
    chosenGenres.push(removedGenre);
  }

  // Chooses 1 seed song per genre
  const seedSongs = chosenGenres.map((genre) => {
    const songsForGenre = popularSongsGenreMap.get(genre);
    if (songsForGenre === undefined) {
      return "";
    }
    const randomInd = Math.floor(Math.random() * songsForGenre.length);
    return songsForGenre[randomInd];
  });

  // returns up min(genres, max) # of seed songs
  return seedSongs;
}
