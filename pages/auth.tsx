import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    if (!router) {
      // Do Nothing
    } else {
      const re = new RegExp(`${router.pathname}#access_token=(.+?)&`, "g");
      const res = re.exec(router.asPath);
      if (res === null || res.length !== 2) {
        throw new Error("Failure in regex matching in auth page");
      }
      const token = res[1];
      window.localStorage.setItem("userSpotifyToken", token);
    }
  }, [router]);

  return <div>Redirecting...</div>;
}
