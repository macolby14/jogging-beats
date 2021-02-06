/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TokenProvider } from "../components/TokenProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <Component {...pageProps} />
    </TokenProvider>
  );
}

export default MyApp;
