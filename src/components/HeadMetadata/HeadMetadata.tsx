import Head from 'next/head'

type Props = {
    pageTitle: string;
    pageDescription: string;
}

const HeadMetadata = ({pageTitle, pageDescription = 'test to see if this overrides'}: Props) => {
  console.log('HeadMetadata', pageTitle, pageDescription)
  return (
    <Head>
      <title>Aperture {pageTitle}</title>
      <meta name='description' content={pageDescription} />
    </Head>
  ) }

export default HeadMetadata
