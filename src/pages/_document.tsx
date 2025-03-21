import Document, { Head, Html, Main, NextScript } from "next/document"
import * as React from "react"

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
