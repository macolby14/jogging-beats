import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";
import { getAllGenres } from "../../utils/results/genreUtils";

// TODO: Remove this entire file. Previously used when genres was a a separate file

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
  selectedGenres: Record<string, boolean>;
  setSelectedGenres: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
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
          className={
            Object.keys(selectedGenres).find(
              (searchGenre) => searchGenre === genre
            )
              ? "selected"
              : ""
          }
          onClick={(e) => {
            e.preventDefault();
            const newObj = { ...selectedGenres };
            if (newObj[genre] !== undefined) {
              delete newObj[genre];
            } else {
              newObj[genre] = true;
            }
            setSelectedGenres(newObj);
          }}
        >
          {genre}
        </GenreStyle>
      ))}
    </GenreOptionStyle>
  );
}
