import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Meta tags essenciais */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6B6B" />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5527070421339032"
          crossOrigin="anonymous"
        />
        
        {/* Meta tags para SEO */}
        <meta name="description" content="Receitas do Dia - Descubra receitas deliciosas, dicas culinárias e truques de chef para suas refeições. Aprenda a cozinhar com confiança e sabor!" />
        <meta name="keywords" content="receitas, culinária, gastronomia, cozinha, comida caseira, dicas de chef, receitas fáceis, receitas rápidas" />
        <meta name="author" content="Receitas do Dia" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://receitadodia.vercel.app/" />
        <meta property="og:title" content="Receitas do Dia - Sua Fonte de Inspiração Culinária" />
        <meta property="og:description" content="Descubra receitas deliciosas, dicas culinárias e truques de chef para suas refeições. Aprenda a cozinhar com confiança e sabor!" />
        <meta property="og:image" content="https://receitadodia.vercel.app/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://receitadodia.vercel.app/" />
        <meta name="twitter:title" content="Receitas do Dia - Sua Fonte de Inspiração Culinária" />
        <meta name="twitter:description" content="Descubra receitas deliciosas, dicas culinárias e truques de chef para suas refeições. Aprenda a cozinhar com confiança e sabor!" />
        <meta name="twitter:image" content="https://receitadodia.vercel.app/og-image.jpg" />
        
        {/* Favicon e ícones */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Verificação de propriedade do site */}
        <meta name="google-site-verification" content="sua-chave-de-verificacao" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://receitadodia.vercel.app/" />
        
        {/* Alternativas de idioma */}
        <link rel="alternate" hrefLang="pt-BR" href="https://receitadodia.vercel.app/" />
        
        {/* PWA meta tags */}
        <meta name="application-name" content="Receitas do Dia" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Receitas do Dia" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#FF6B6B" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Fonte personalizada */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 