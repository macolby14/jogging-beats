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

  input {
    border: none;
    display: inline;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    width: auto;
  }

  input:focus {
    outline: none;
  }

  button {
    width: 200px;
  }
`;

const ButtonsStyle = styled.div`
  display: flex;
  gap: 32px;
`;

const CopyStyle = styled.div`
  display: flex;
  gap: 16px;
`;

const ClipboardStyle = styled.div`
  cursor: pointer;
`;

export default function Playlist() {
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement | null>(null);
  const { link } = router.query;
  const decodedLink = decodeURIComponent(
    link === undefined || Array.isArray(link) ? "/" : link
  );

  function copyInput() {
    if (inputEl === null || inputEl.current === null) {
      return;
    }
    inputEl.current.select();
    document.execCommand("copy");
    // inputEl.current.selectionStart = inputEl.current.selectionEnd; - TODO - add this and some feedback message is copied
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
        <input
          size={decodedLink.length} // -3 is arbitrary, but inputs are too long without this
          value={decodedLink}
          readOnly
          ref={inputEl}
        />
        <Tooltip direction="right" gap={4} text="Copy to clipboard">
          <ClipboardStyle role="button" onClick={copyInput}>
            <img src="/content_copy-24px.svg" alt="Copy to clipboard" />
          </ClipboardStyle>
        </Tooltip>
      </CopyStyle>
    </Style>
  );
}
