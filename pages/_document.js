import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5527070421339032"
          crossOrigin="anonymous"
        />
      </Head>
      {/* Google Analytics - Colocado imediatamente após o Head */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-DFLX0F5RND"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DFLX0F5RND');
          `
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 