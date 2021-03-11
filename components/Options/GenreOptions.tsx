import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { getAllGenres } from "../../utils/results/genreUtils";

const GenreOptionStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  padding: 32px;

  .selected {
    background-color: var(--light);
  }
`;

const GenreStyle = styled.button`
  display: inline-block;
  font-size: var(--text-size-4);
  background-color: var(--medium);
  min-width: auto;
  width: auto;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
`;

interface GenreOptionProps {
  selectedGenres: Set<string>;
  setSelectedGenres: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export function GenreOptions({
  selectedGenres,
  setSelectedGenres,
}: GenreOptionProps) {
  const genres = getAllGenres();

  return (
    <GenreOptionStyle>
      {genres.map((genre) => (
        <GenreStyle
          key={genre}
          className={selectedGenres.has(genre) ? "selected" : ""}
          onClick={(e) => {
            e.preventDefault();
            const newSet = new Set(selectedGenres);
            if (newSet.has(genre)) {
              newSet.delete(genre);
            } else {
              newSet.add(genre);
            }
            setSelectedGenres(newSet);
          }}
        >
          {genre}
        </GenreStyle>
      ))}
    </GenreOptionStyle>
  );
}
