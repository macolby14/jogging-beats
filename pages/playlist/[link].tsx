import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { Heading } from "../../components/Heading";

const Style = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Playlist() {
  const router = useRouter();
  const { link } = router.query;

  return (
    <div>
      <Heading level={2}>Your Playlist is on your Spotify</Heading>
      <Style>
        <button
          disabled={link === undefined || Array.isArray(link)}
          type="button"
          onClick={() => {
            router.push(
              decodeURIComponent(
                link === undefined || Array.isArray(link) ? "/" : link
              )
            );
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
      </Style>
    </div>
  );
}
