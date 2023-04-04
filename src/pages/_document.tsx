import {Html, Head, Main, NextScript} from 'next/document'

const Document = () => <Html>
  <Head>
    <link rel='preconnect' href='https://fonts.googleapis.com'/>
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true'/>
    <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap' rel='stylesheet'/>
    {/* Open Graph Defaults */}
    <meta property='og:title' content='Aperture' key='title'/>
    <meta property='og:description' content='Internal Tooling for Bink Users' key='description'/>
    <meta property='og:image' content='/icons/pngs/aperture-transparent.png' />
    <meta property='og:image:width' content='505' />
    <meta property='og:image:height' content='494' />
    <meta property='og:site_name' content='Aperture' />
  </Head>
  <body>
    <Main />
    <NextScript />
  </body>
</Html>


export default Document
