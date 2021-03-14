import { useContext, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { SpotifyAuthPop } from "./AuthPop/SpotifyAuthPop";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { Spacer } from "./Spacer";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth: "60%",
    minHeight: "60%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 2,
  },
};

const LoginCompleteStyle = styled.div`
  svg {
    width: 100px;
    display: block;
    margin: 40px auto 0;
  }

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    &.circle {
      -webkit-animation: dash 0.9s ease-in-out;
      animation: dash 0.9s ease-in-out;
    }
    &.line {
      stroke-dashoffset: 1000;
      -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
      animation: dash 0.9s 0.35s ease-in-out forwards;
    }
    &.check {
      stroke-dashoffset: -100;
      -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
      animation: dash-check 0.9s 0.35s ease-in-out forwards;
    }
  }

  p {
    text-align: center;
    margin: 20px 0 60px;
    font-size: 1.25em;
    &.success {
      color: var(--complement);
    }
    &.error {
      color: #d06079;
    }
  }

  @-webkit-keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @-webkit-keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }

  @keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }
`;

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
}

export function LoginRequiredModal({ isOpen, setIsOpen }: Props) {
  const { setUserToken } = useContext(ImplicitAuthContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginDisplay = (
    <>
      <Spacer size={50} />
      <Heading level={4}>You must login to Spotfiy to add a Playlist</Heading>
      <Spacer size={50} />
      <SpotifyAuthPop
        onCode={async (code: string) => {
          setUserToken(code);
          setLoggedIn(true);
          setTimeout(() => {
            setIsOpen(false);
          }, 3000);
        }}
      />
    </>
  );

  // Source: https://codepen.io/elevaunt/pen/VvKdVa
  const loginCompleteDisplay = (
    <LoginCompleteStyle>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          className="path circle"
          fill="none"
          stroke="var(--complement)"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          className="path check"
          fill="none"
          stroke="var(--complement)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <p className="success">You successfully logged in with Spotify</p>
      <Spacer size={10} />
      <p className="success" style={{ color: "var(--black)" }}>
        You can now create your playlist on Spotify!
      </p>
    </LoginCompleteStyle>
  );

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      style={customStyles}
      contentLabel="Login Required Modal"
    >
      {loggedIn ? loginCompleteDisplay : loginDisplay}
    </Modal>
  );
}
