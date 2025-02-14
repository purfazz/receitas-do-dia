import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '../components/Navbar'
import Head from 'next/head'
import CookieConsent from '../components/CookieConsent'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <CookieConsent />
      <Analytics />
    </ChakraProvider>
  )
} 