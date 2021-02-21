import { useContext, useState } from "react";
import styled from "styled-components";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { TrackData } from "./Track";
import { LoginRequiredModal } from "./LoginRequiredModal";
import { ConfirmationModal } from "./ConfirmationModal";

interface Props {
  selectedTracks: Record<string, TrackData>;
  duration: number;
  title: string;
  description: string;
}

const Style = styled.button`
  border: 2px solid black;
  border-radius: 10px;
  width: 200px;
`;

export function PlaylistCreationButton({
  selectedTracks,
  duration,
  title,
  description,
}: Props) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [confrimationModalOpen, setConfirmationModalOpen] = useState(false);
  const { userId } = useContext(ImplicitAuthContext);

  function handleClick() {
    if (!userId) {
      setLoginModalOpen(true);
    } else {
      setConfirmationModalOpen(true);
    }
  }

  return (
    <>
      <Heading level={4}>
        <Style type="button" onClick={handleClick}>
          Create Playlist on Spotify
        </Style>
      </Heading>
      <LoginRequiredModal
        isOpen={loginModalOpen}
        setIsOpen={setLoginModalOpen}
      />
      <ConfirmationModal
        isOpen={confrimationModalOpen}
        setIsOpen={setConfirmationModalOpen}
        selectedTracks={selectedTracks}
        duration={duration}
        title={title}
        description={description}
      />
    </>
  );
}
