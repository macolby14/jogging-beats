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
