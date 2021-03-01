/* eslint-disable react/jsx-props-no-spreading */
// Source: https://www.joshwcomeau.com/react/modern-spacer-gif/

interface SpacerProps {
  size: number;
  axis?: "vertical" | "horizontal" | "";
  style?: any;
  delegated?: any;
}

export const Spacer = ({
  size,
  axis = "",
  style = {},
  ...delegated
}: SpacerProps) => {
  const width = axis === "vertical" ? 1 : size;
  const height = axis === "horizontal" ? 1 : size;
  return (
    <span
      style={{
        display: axis === "horizontal" ? "inline-block" : "block",
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
      {...delegated}
    />
  );
};
