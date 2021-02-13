// eslint-disable-next-line no-use-before-define
import React from "react";

interface TrackSelectProps {
  className?: string;
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  selectHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function TrackSelect({
  className = "",
  selected,
  selectHandler,
}: TrackSelectProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={className} onClick={selectHandler}>{`${Boolean(
      selected
    )}`}</div>
  );
}
