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
          <meta name='viewport' />
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
