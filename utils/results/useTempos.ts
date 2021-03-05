import { useContext, useEffect, useState } from "react";
import { authFetch } from "../authFetch";
import { TokenContext } from "../../components/context/TokenProvider";
import { TrackData } from "../../components/Track";

interface useTemposProps {
  tracks: TrackData[];
}

export function useTempos({ tracks }: useTemposProps) {
  const [tempos, setTempos] = useState<Record<string, number>>({});
  const token = useContext(TokenContext);

  useEffect(() => {
    if (token === undefined || tracks.length === 0) {
      // do nothing
    } else {
      const ids = encodeURIComponent(tracks.map((track) => track.id).join(","));
      authFetch({
        url: `https://api.spotify.com/v1/audio-features?ids=${ids}`,
        token,
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (!resp.audio_features) {
            throw new Error("Audio features fetch failed");
          }
          const audioFeatures: any[] = resp.audio_features;
          const newTempos: typeof tempos = {};
          audioFeatures.forEach((track: any) => {
            newTempos[track.id] = track.tempo;
          });
          setTempos(newTempos);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(
            `Error in BeatsResuts when fetching audio-features: ${err}`
          );
        });
    }
  }, [token, tracks]);

  return { tempos };
}
