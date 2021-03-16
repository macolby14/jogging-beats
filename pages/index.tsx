import Link from "next/link";
import { HeroBox } from "../components/HeroBox";
import { Spacer } from "../components/Spacer";

export default function Home() {
  return (
    <>
      <HeroBox />
      <Spacer size={16} />
      <button type="button" style={{ margin: "auto" }}>
        <Link href="/search">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>Get Started</a>
        </Link>
      </button>
    </>
  );
}
