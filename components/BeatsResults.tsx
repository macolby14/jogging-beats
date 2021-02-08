/* eslint-disable camelcase */
interface Artist {
  name: string;
  type: "artist";
}

interface Results {
  recommendations: {
    tracks: {
      artists: Artist[];
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      id: string;
      name: string;
      preview_url: string;
      type: "track";
    }[];
  };
}

export function BeatsResults({ recommendations: { tracks } }: Results) {
  console.log(tracks);
  return (
    <div>
      <h5>Beats Results</h5>
      {tracks.map((track) => (
        <div key={track.id}>{track.name}</div>
      ))}
    </div>
  );
}
