import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import 'react-contexify/dist/ReactContexify.css'
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <div
      style={{
        background: '#2A303C',
      }}
    >
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  )
}

export default MyApp
