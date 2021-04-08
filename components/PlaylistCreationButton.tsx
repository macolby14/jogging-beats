import { useContext, useState } from "react";
import styled from "styled-components";
import { ImplicitAuthContext } from "./context/ImplicitAuthProvider";
import { Heading } from "./Heading";
import { TrackData } from "./Track";
import { LoginRequiredModal } from "./LoginRequiredModal";
import { ConfirmationModal } from "./ConfirmationModal";

interface Props {
  selectedTracks: TrackData[];
  duration: number;
  title: string;
  description: string;
  width?: number;
}

const Style = styled.button<{ width?: number }>`
  width: ${(props) => (props.width ? props.width : "auto")};
`;

export function PlaylistCreationButton({
  selectedTracks,
  duration,
  title,
  description,
  width,
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
      <Style type="button" onClick={handleClick} width={width}>
        <Heading level={4} mobileLevel={6}>
          Create Playlist <span className="desktop-only">&nbsp;on Spotify</span>
        </Heading>
      </Style>

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
