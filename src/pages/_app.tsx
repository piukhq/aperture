import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {store} from '../app/store'
import {Layout} from 'components'

import '../styles/globals.css'

function MyApp ({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Bink Portal</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
