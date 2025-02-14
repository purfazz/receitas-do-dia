import { Box } from '@chakra-ui/react'
import Script from 'next/script'

export default function AdComponent() {
  return (
    <Box my={4}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5527070421339032"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5527070421339032"
        data-ad-slot="seu-slot-id"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsense-init">
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </Script>
    </Box>
  )
} 