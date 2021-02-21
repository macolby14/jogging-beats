import React, { useContext, useEffect, useState } from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { authFetch } from "../utilities/authFetch";
import { durationFormat } from "../utilities/durationFormat";
import { Heading } from "../components/Heading";
import { Track, TrackData } from "../components/Track";
import { useSelectedTracks } from "../components/Results/useSelectedTracks";
import { useTempos } from "../components/Results/useTempos";
import { PlaylistCreationButton } from "../components/PlaylistCreationButton";
import { TokenContext } from "../components/context/TokenProvider";

/* eslint-disable camelcase */
interface ResultsProps {
  targetDuration: number; // in ms
  recommendations: {
    tracks: TrackData[];
  };
}

const ResultsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TitleStyle = styled.label`
  font-size: var(--text-size-4);
  margin: auto;

  input[type="text"] {
    font-size: var(--text-size-4);
  }

  textarea {
    vertical-align: top;
    font-size: var(--text-size-7);
  }
`;

export default function Results() {
  const router = useRouter();
  const token = useContext(TokenContext);
  const { bpm: bpmParam, targetDuration: targetDurationParam } = router.query;
  const [bpm, setBpm] = useState(0);
  const [targetDuration, setTargetDuration] = useState(0);
  const [tracks, setTracks] = useState<TrackData[]>([]);
  const [loading, setLoading] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState(
    "My Jogging Beats Playlist"
  );
  const [playlistDescription, setPlaylistDescription] = useState(
    "My playlist from joggingbeats.com"
  );
  const { selectedTracks, selectedTracksDuration, setSelectedHandler} = useSelectedTracks({ tracks, targetDuration }); // prettier-ignore
  const { tempos } = useTempos({ tracks });

  async function fetchSongs(bpmAsNum: number): Promise<any> {
    console.log("Creating fetchSongs");
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

  console.log("Query Params");
  console.log(router.query);

  useEffect(() => {
    if (
      bpmParam === undefined ||
      Array.isArray(bpmParam) ||
      targetDurationParam === undefined ||
      Array.isArray(targetDurationParam) ||
      token === undefined
    ) {
      console.log("UseEffect does nothing for results");
      console.log(bpmParam);
      // Nothing - need to return from useEffect without cleanup
    } else {
      const bpmAsNum = parseInt(bpmParam, 10);
      const targetDurationAsNum = parseInt(targetDurationParam, 10);
      setBpm(bpmAsNum);
      setTargetDuration(targetDurationAsNum);
      setLoading(true);
      console.log("Calling fetchSongs()");
      fetchSongs(bpmAsNum).then(({ tracks: results }) => {
        setTracks(results);
        setLoading(false);
      });
    }
  }, [bpmParam, targetDurationParam, token]);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlaylistTitle(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlaylistDescription(e.target.value);
  }

  return (
    <>
      <TitleStyle>
        Playlist title:&nbsp;
        <input type="text" value={playlistTitle} onChange={handleTitleChange} />
      </TitleStyle>
      <TitleStyle>
        Playlist description:&nbsp;
        <textarea
          rows={3}
          cols={50}
          value={playlistDescription}
          onChange={handleDescriptionChange}
        />
      </TitleStyle>
      <PlaylistCreationButton
        selectedTracks={selectedTracks}
        duration={selectedTracksDuration}
        title={playlistTitle}
        description={playlistDescription}
      />
      <Heading level={5}>
        Playlist Length: {durationFormat(selectedTracksDuration)}
      </Heading>
      <ResultsGrid>
        {tracks.map((track) => {
          const isSelected = Boolean(selectedTracks[track.id]);
          return (
            <Track
              tempo={tempos[track.id]}
              key={track.id}
              {...track} // eslint-disable-line react/jsx-props-no-spreading
              selected={isSelected}
              selectHandler={() => {
                setSelectedHandler(track);
              }}
            />
          );
        })}
      </ResultsGrid>
    </>
  );
}
