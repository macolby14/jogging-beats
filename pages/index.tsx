import { useRouter } from "next/dist/client/router";
import { HeroBox } from "../components/HeroBox";
import { Spacer } from "../components/Spacer";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <HeroBox />
      <Spacer size={16} />
      <button
        type="button"
        style={{ margin: "auto" }}
        onClick={() => {
          router.push("/search");
        }}
      >
        Get Started
      </button>
    </>
  );
}
