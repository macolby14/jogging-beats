import React from "react"; // eslint-disable-line no-use-before-define
import styled from "styled-components";

type TooltipDirections = "top" | "bottom";

interface TooltipsStylesProps {
  dir: TooltipDirections;
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

  ${({ dir }) => {
    switch (dir) {
      case "top":
        return `
        .tooltiptext{
            width: 120px;
            bottom: 120%;
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
            top: 120%;
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
      default:
        return ``;
    }
  }}
`;

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  dir: TooltipDirections;
}

export function Tooltip({ children, text, dir }: TooltipProps) {
  return (
    <ToolTipStyles dir={dir}>
      {children}
      <span className="tooltiptext">{text}</span>
    </ToolTipStyles>
  );
}
