import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/icon.svg" />
      </Head>
      <body className="bg-background text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
