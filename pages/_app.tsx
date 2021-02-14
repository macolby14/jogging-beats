/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { TokenProvider } from "../components/context/TokenProvider";
import { ImplicitAuthProvider } from "../components/context/ImplicitAuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jogging Beats</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,500;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ImplicitAuthProvider>
        <TokenProvider>
          <Component {...pageProps} />
        </TokenProvider>
      </ImplicitAuthProvider>
    </>
  );
}

export default MyApp;
