import Head from 'next/head'

type Props = {
    pageTitle: string;
    pageDescription: string;
}

const HeadMetadata = ({pageTitle = 'Aperture', pageDescription = 'Internal Portal for Bink Tooling'}: Props) => {
  return (
    <Head>
      <title>Aperture {pageTitle}</title>
      <meta name='description' content={pageDescription} />
    </Head>
  ) }

export default HeadMetadata
