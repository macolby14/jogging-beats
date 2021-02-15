import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    if (!router) {
      /* do nothing */
      console.log("No router");
    } else if (router && !router.query.code) {
      console.log(router.query.code);
      //   router.push("/");
    } else {
      if (Array.isArray(router.query.code)) {
        throw new Error("Error in code in auth page");
      }
      window.localStorage.setItem(
        "userSpotifyToken",
        router.query.code || "ERROR"
      );
    }
  }, [router]);

  return <div>Redirecting...</div>;
}
