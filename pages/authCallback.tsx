import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

export default function authCallback() {
  const router = useRouter();

  console.log(router);
  console.log(router.query);

  useEffect(() => {
    router.push("/");
  }, [router]);

  return <div>Test</div>;
}
