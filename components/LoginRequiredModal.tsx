import { useContext } from "react";
import Modal from "react-modal";
import { SpotifyAuthPop } from "./AuthPop/SpotifyAuthPop";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";

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
};

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
}

export function LoginRequiredModal({ isOpen, setIsOpen }: Props) {
  const { setUserToken } = useContext(ImplicitAuthContext);

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
      <Heading level={4}>You must login to Spotfiy to add a Playlist</Heading>
      <SpotifyAuthPop
        onCode={(code: string) => {
          setUserToken(code);
          setIsOpen(false);
        }}
      />
    </Modal>
  );
}
