import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {store, persistor} from '../app/store'
import {Layout} from 'components'
import {PersistGate} from 'redux-persist/integration/react'
import {UserProvider} from '@auth0/nextjs-auth0'
import '../styles/globals.css'

function MyApp ({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Aperture</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=0.55, maximum-scale=5, user-scalable=yes' />
          <meta property='og:title' content='Aperture' />
          <meta property='og:description' content='The Bink Internal Portal providing tooling for Mid Management, Plan Management and Customer Support' />
          <meta property='og:image' content='/icons/pngs/aperture-transparent.png' />
          <meta property='og:image:width' content='400' />
          <meta property='og:image:height' content='400' />
          <meta property='og:site_name' content='Aperture' />
          <meta property='og:url' content='https://portal.gb.bink.com' />
        </Head>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
