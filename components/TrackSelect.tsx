// eslint-disable-next-line no-use-before-define
import React from "react";
import styled from "styled-components";
import { Tooltip } from "./Tooltip";

interface TrackSelectProps {
  className?: string;
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  selectHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const IconStyle = styled.img`
  cursor: pointer;
`;

export function TrackSelect({
  className = "",
  selected,
  selectHandler,
}: TrackSelectProps) {
  let selectIcon;

  if (selected) {
    selectIcon = (
      <Tooltip direction="right" gap={5} text="Remove from your playlist">
        <IconStyle
          src="/remove_circle_outline-24px.svg"
          alt="
        Add Track to Playlist"
        />
      </Tooltip>
    );
  } else {
    selectIcon = (
      <Tooltip direction="right" gap={5} text="Add song to your playlist">
        <IconStyle
          src="/add_circle_outline-24px.svg"
          alt="Add Track to Playlist"
        />
      </Tooltip>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={className} onClick={selectHandler}>
      {selectIcon}
    </div>
  );
}
