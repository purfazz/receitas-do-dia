import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        {/* Meta tags básicas */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#319795" />
        
        {/* Meta tags de idioma e região */}
        <meta property="og:locale" content="pt_BR" />
        <meta httpEquiv="content-language" content="pt-BR" />
        <link rel="alternate" href="https://receitas-git-main-purfazzs-projects.vercel.app" hrefLang="pt-BR" />
        <link rel="alternate" href="https://receitas-git-main-purfazzs-projects.vercel.app" hrefLang="x-default" />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags para SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="Receita do Dia" />
        <meta name="copyright" content="© 2024 Receita do Dia" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph padrão */}
        <meta property="og:site_name" content="Receita do Dia" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Cards padrão */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@receitadodia" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </Head>
      
      {/* Google Analytics com consentimento padrão negado */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            });
            gtag('config', 'G-DFLX0F5RND', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure'
            });
          `
        }}
      />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-DFLX0F5RND"></script>

      {/* Google AdSense com consentimento */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5527070421339032" crossOrigin="anonymous" />
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 