// eslint-disable-next-line no-use-before-define
import React from "react";
import styled from "styled-components";
import { Tooltip } from "./Tooltip";

interface TrackSelectProps {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  selectHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const IconStyle = styled.img`
  cursor: pointer;
`;

export function TrackSelect({
  className = "",
  selectHandler,
}: TrackSelectProps) {
  const selectIcon = (
    <Tooltip direction="right" gap={5} text="Swap out this song">
      <IconStyle
        src="/swap_circle_24dp.svg"
        alt="
        Swap out this song"
      />
    </Tooltip>
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={className} onClick={selectHandler}>
      {selectIcon}
    </div>
  );
}
