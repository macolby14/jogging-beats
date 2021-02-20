import { useRouter } from "next/dist/client/router";

export default function Playlist() {
  const router = useRouter();
  const { id } = router.query;
  return <div>Playlist Page: {id}</div>;
}
