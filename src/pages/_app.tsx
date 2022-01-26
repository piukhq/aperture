import {Provider} from 'react-redux'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {store} from '../app/store'
import Sidebar from 'components/Sidebar'

import '../styles/globals.css'

function MyApp ({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Bink Portal</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <div className='flex h-screen bg-off-white-2'>
        <Sidebar />

        <div className='flex w-full'>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  )
}

export default MyApp
