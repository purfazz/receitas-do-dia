import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        {/* Meta tags básicas */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#319795" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags para SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Receita do Dia" />
        <meta name="copyright" content="© 2024 Receita do Dia" />
        
        {/* Open Graph padrão */}
        <meta property="og:site_name" content="Receita do Dia" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Cards padrão */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@receitadodia" />
        
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5527070421339032"
          crossOrigin="anonymous"
        />

        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
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