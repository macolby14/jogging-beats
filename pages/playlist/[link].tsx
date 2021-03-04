import React, { useRef } from "react"; // eslint-disable-line no-use-before-define
import { useRouter } from "next/dist/client/router";

import styled from "styled-components";
import { Heading } from "../../components/Heading";
import { Spacer } from "../../components/Spacer";
import { Tooltip } from "../../components/Tooltip";

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    width: 200px;
  }
`;

const ButtonsStyle = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CopyStyle = styled.div`
  display: flex;
  gap: 16px;
  max-width: 90vw;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: center;
`;

const LinkStyle = styled.div`
  max-width: 80%;
  word-wrap: break-word;
`;

const ClipboardStyle = styled.div`
  cursor: pointer;
`;

export default function Playlist() {
  const router = useRouter();
  const inputEl = useRef<HTMLDivElement | null>(null);
  const { link } = router.query;
  const decodedLink = decodeURIComponent(
    link === undefined || Array.isArray(link) ? "/" : link
  );

  function copyInput() {
    if (inputEl === null || inputEl.current === null) {
      return;
    }
    const range = document.createRange();
    range.selectNode(inputEl.current);
    window.getSelection()?.removeAllRanges(); // clear current selection
    window.getSelection()?.addRange(range); // to select text
    document.execCommand("copy");
    // window.getSelection()?.removeAllRanges(); // to deselect - TODO: add feedback and this line
    document.execCommand("copy");
  }

  return (
    <Style>
      <Heading level={2}>Your Playlist is on your Spotify</Heading>
      <Spacer size={32} />
      <ButtonsStyle>
        <a
          href={decodedLink}
          className="button"
          target="_blank"
          rel="noreferrer noopener"
          // disabled={link === undefined || Array.isArray(link)}
          type="button"
        >
          Listen Now
        </a>
        <button
          type="button"
          onClick={() => {
            router.push("/");
          }}
        >
          Search Again
        </button>
      </ButtonsStyle>
      <Spacer size={32} />
      <p> Share your playlist:</p>
      <Spacer size={8} />
      <CopyStyle>
        <LinkStyle ref={inputEl}>{decodedLink}</LinkStyle>
        <Tooltip direction="right" gap={4} text="Copy to clipboard">
          <ClipboardStyle role="button" onClick={copyInput}>
            <img src="/content_copy-24px.svg" alt="Copy to clipboard" />
          </ClipboardStyle>
        </Tooltip>
      </CopyStyle>
    </Style>
  );
}
