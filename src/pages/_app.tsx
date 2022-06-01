import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {store, persistor} from '../app/store'
import {Layout} from 'components'
import {PersistGate} from 'redux-persist/integration/react'

import '../styles/globals.css'

function MyApp ({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Bink Portal</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
