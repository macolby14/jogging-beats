/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { TokenProvider } from "../components/context/TokenProvider";
import { ImplicitAuthProvider } from "../components/context/ImplicitAuthProvider";
import { SettingsProvider } from "../components/context/SettingsProvider";
import { Spacer } from "../components/Spacer";
import { Box } from "../components/Box";
import { PageHeader } from "../components/PageHeader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Jogging Beats</title>
        <link rel="icon" href="/favicon.svg" />
        {/* For Safari */}
        <link rel="mask-icon" href="/favicon.svg" color="#ff860e" />
        {/* For android chrome browser */}
        <meta name="theme-color" content="#ff860e" />
        {/* For iOS touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,500;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ImplicitAuthProvider>
        <TokenProvider>
          <SettingsProvider>
            <Spacer size={50} />
            <Box size={1280} gap={16}>
              <PageHeader />
              <Spacer size={16} />
              <Component {...pageProps} />
            </Box>
          </SettingsProvider>
        </TokenProvider>
      </ImplicitAuthProvider>
    </>
  );
}

export default MyApp;
