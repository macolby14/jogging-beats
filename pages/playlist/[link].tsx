import React, { useRef } from "react"; // eslint-disable-line no-use-before-define
import { useRouter } from "next/dist/client/router";

import styled from "styled-components";
import { Heading } from "../../components/Heading";
import { Spacer } from "../../components/Spacer";

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  input {
    border: none;
    display: inline;
    font-family: inherit;
    font-size: inherit;
    padding: none;
    width: auto;
  }

  input:focus {
    outline: none;
  }
`;

export default function Playlist() {
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement | null>(null);
  const { link } = router.query;
  const decodedLink = decodeURIComponent(
    link === undefined || Array.isArray(link) ? "/" : link
  );

  function copyInput(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (inputEl === null || inputEl.current === null) {
      return;
    }
    inputEl.current.select();
    document.execCommand("copy");
    (e.target as any).focus(); // focus used to deselect (unhighlight text after copy
  }

  return (
    <Style>
      <Heading level={2}>Your Playlist is on your Spotify</Heading>
      <Spacer size={32} />
      <div>
        <button
          disabled={link === undefined || Array.isArray(link)}
          type="button"
          onClick={() => {
            router.push(decodedLink);
          }}
        >
          Listen Now
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/");
          }}
        >
          Search Again
        </button>
      </div>
      <Spacer size={32} />
      <p> Share your playlist:</p>
      <Spacer size={8} />
      <div>
        <input
          size={decodedLink.length}
          value={decodedLink}
          readOnly
          ref={inputEl}
        />
        <button type="button" onClick={copyInput}>
          Copy to Clipboard
        </button>
      </div>
    </Style>
  );
}
