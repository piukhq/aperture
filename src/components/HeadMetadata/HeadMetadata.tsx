import Head from 'next/head'

type Props = {
    pageTitle: string;
    pageDescription: string;
}

const HeadMetadata = ({pageTitle, pageDescription}: Props) => (
  <Head>
    <title>{pageTitle}</title>
    <meta name='description' content={pageDescription} />
    <meta property='og:title' content={pageTitle} />
    <meta property='og:description' content={pageDescription} />
    <meta property='og:image' content='/icons/pngs/aperture-transparent.png' />
    <meta property='og:image:width' content='505' />
    <meta property='og:image:height' content='494' />
    <meta property='og:site_name' content='Aperture' />
  </Head>
)

export default HeadMetadata
