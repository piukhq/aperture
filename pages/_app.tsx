import type { AppProps /*, AppContext */ } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'

import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Internal Portal</title>
        <meta name="description" content='This is the internal portal' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}