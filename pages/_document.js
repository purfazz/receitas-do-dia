import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const baseUrl = 'https://receitadodia.vercel.app'
    const jsonLd = `{
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "${baseUrl}",
      "name": "Receita do Dia - Gerador de Receitas Online",
      "description": "🎲 Gerador de Receitas Online Grátis! Clique e descubra uma receita deliciosa para fazer hoje. Mais de 20 receitas caseiras com passo a passo.",
      "inLanguage": "pt-BR",
      "keywords": "gerador de receitas, receitas aleatórias, receitas online, receitas grátis, receitas caseiras, receitas fáceis",
      "genre": "Culinária e Gastronomia",
      "isFamilyFriendly": "True",
      "potentialAction": [{
        "@type": "SearchAction",
        "target": "${baseUrl}/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }],
      "publisher": {
        "@type": "Organization",
        "name": "Receita do Dia",
        "logo": {
          "@type": "ImageObject",
          "url": "${baseUrl}/logo.png",
          "width": "180",
          "height": "180"
        }
      },
      "mainEntity": {
        "@type": "WebPage",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Receitas",
            "item": "${baseUrl}"
          }]
        }
      }
    }`

    return (
      <Html lang="pt">
        <Head>
          {/* Meta tags básicas */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#319795" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Meta tags de idioma e região */}
          <meta property="og:locale" content="pt_BR" />
          <meta httpEquiv="content-language" content="pt-BR" />
          <link rel="alternate" href={baseUrl} hrefLang="pt-BR" />
          <link rel="alternate" href={baseUrl} hrefLang="x-default" />
          
          {/* Favicons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          
          {/* Meta tags para SEO */}
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="author" content="Receita do Dia" />
          <meta name="copyright" content="© 2024 Receita do Dia" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="description" content="🎲 Gerador de Receitas Online Grátis! Clique e descubra uma receita deliciosa para fazer hoje. 🥘 Mais de 20 receitas caseiras com passo a passo. Lasanha, Strogonoff, Bolos e muito mais!" />
          
          {/* Open Graph padrão */}
          <meta property="og:site_name" content="Receita do Dia" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="🎲 Gerador de Receitas Online Grátis! Clique e descubra uma receita deliciosa para fazer hoje. 🥘 Mais de 20 receitas caseiras com passo a passo. Lasanha, Strogonoff, Bolos e muito mais!" />
          
          {/* Twitter Cards padrão */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@receitadodia" />
          
          {/* Meta tags para definição clara do escopo do site */}
          <meta name="category" content="Culinária, Receitas, Gastronomia" />
          <meta name="rating" content="general" />
          <meta name="subject" content="Receitas culinárias e gastronomia" />
          <meta name="classification" content="Culinária" />
          <meta name="reply-to" content="contato@receitadodia.com.br" />
          
          {/* Meta tags de segurança e controle */}
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          
          {/* Preconnect para recursos externos */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
          
          {/* DNS Prefetch */}
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

          {/* Schema.org WebSite */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLd
            }}
          />

          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-DFLX0F5RND" />
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

          {/* Google AdSense */}
          <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5527070421339032"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument 