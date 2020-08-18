import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'



class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>Stripe Payments</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document