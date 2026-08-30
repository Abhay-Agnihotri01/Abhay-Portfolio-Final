import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/*
            Shipping with a system font stack, so there is nothing to preload.
            If you add self-hosted webfonts, preload only the one or two weights
            first paint needs:

            <link rel="preload" href="/fonts/YourFont.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

            A preload without rel and crossOrigin is silently ignored by browsers.
          */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
