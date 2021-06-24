/* eslint-disable react/jsx-props-no-spreading */
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          {/* Viewport tag in _app.tsx https://err.sh/next.js/no-document-viewport-meta */}
          {/* Default title in _app.tsx https://nextjs.org/docs/messages/no-document-title */}
          <meta
            name="description"
            content="A web app that allows users to generate playlists for a target running tempo and add them to their Spotify account.  Sync your workout to a tempo to go faster."
          />
          <meta
            property="og:title"
            content="Jogging Beats - A workout music playlist generation site"
            key="title"
          />
          <meta
            property="og:description"
            content="A web app that allows users to generate playlists for a target running tempo and add them to their Spotify account.  Sync your workout to a tempo to go faster."
          />
          <meta
            name="image"
            property="og:image"
            content="https://joggingbeats.com/home_og_image.jpg"
          />
          <meta
            property="og:image:secure_url"
            content="https://joggingbeats.com/home_og_image.jpg"
          />
          <meta property="og:image:width" content="1337" />
          <meta property="og:image:height" content="878" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://joggingbeats.com" />
          <meta name="twitter:card" content="summary_large_image" />

          <meta name="theme-color" content="#ff860e" />
          <link rel="icon" href="/favicon.svg" />
          <link rel="mask-icon" href="/favicon.svg" color="#ff860e" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="canonical" href="https://joggingbeats.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
