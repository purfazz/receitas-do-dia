import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DFLX0F5RND"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-DFLX0F5RND');
        `}
      </Script>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  )
} 