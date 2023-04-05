import {Html, Head, Main, NextScript} from 'next/document'

const Document = () => <Html>
  <Head>
    <link rel='preconnect' href='https://fonts.googleapis.com'/>
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true'/>
    <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap' rel='stylesheet'/>
    <meta property='og:title' content='Aperture - Bink Internal Portal' />
    <meta property='og:description' content='This is coming from document' />
  </Head>
  <body>
    <Main />
    <NextScript />
  </body>
</Html>


export default Document
