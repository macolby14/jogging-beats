import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";

type TooltipDirections = "top" | "bottom" | "left" | "right";

interface TooltipsStylesProps {
  dir: TooltipDirections;
  gap: number;
}

const ToolTipStyles = styled.div<TooltipsStylesProps>`
  position: relative;
  display: inline-block;

  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: white;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    font-size: var(--text-size-7);

    position: absolute;
    z-index: 1;
  }

  :hover .tooltiptext {
    visibility: visible;
  }

  ${({ dir, gap }) => {
    switch (dir) {
      case "top":
        return `
        .tooltiptext{
            width: 120px;
            bottom: calc(100% + ${gap}px);
            left: 50%;
            margin-left: -60px;
        }
        
        .tooltiptext::after {
            content: " ";
            position: absolute;
            top: 100%; /* At the top of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: black transparent transparent transparent;
        }
        `;
      case "bottom":
        return `
        .tooltiptext{
            width: 120px;
            top: calc(100% + ${gap}px);
            left: 50%;
            margin-left: -60px;
        }

        .tooltiptext::after {
            content: " ";
            position: absolute;
            bottom: 100%; /* At the top of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent black transparent;
        }
        `;
      case "right":
        return `
        .tooltiptext{
            top: -5px;
            left: calc(100% + ${gap}px);
        }

        .tooltiptext::after {
            content: " ";
            position: absolute;
            right: 100%; /* At the top of the tooltip */
            top: 50%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent black transparent transparent;
        }
        `;
      case "left":
        return `
        .tooltiptext{
            top: -5px;
            right: calc(100% + ${gap}px);
        }

        .tooltiptext::after {
            content: " ";
            position: absolute;
            left: 100%; /* At the top of the tooltip */
            top: 50%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent black;
        }
        `;
      default:
        return ``;
    }
  }}
`;

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  direction: TooltipDirections;
  gap?: number;
}

export function Tooltip({ children, text, direction, gap = 0 }: TooltipProps) {
  return (
    <ToolTipStyles dir={direction} gap={gap}>
      {children}
      <span className="tooltiptext">{text}</span>
    </ToolTipStyles>
  );
}
