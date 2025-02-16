import { Box, useColorModeValue } from '@chakra-ui/react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AdComponent({ showOnlyWithContent = true, contentExists = false }) {
  const router = useRouter()
  const [shouldRender, setShouldRender] = useState(false)
  const [isProduction, setIsProduction] = useState(false)
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  
  useEffect(() => {
    // Verifica se está em produção
    setIsProduction(process.env.NODE_ENV === 'production')
    
    // Verifica se a página tem conteúdo substancial (pelo menos 1000 caracteres)
    const hasEnoughContent = document.body.innerText.length > 1000
    
    // Verifica se não é uma página de erro, admin, ou API
    const isValidPage = !router.pathname.includes('/404') && 
                       !router.pathname.includes('/admin') &&
                       !router.pathname.includes('/api')
    
    // Verifica se tem conteúdo específico quando necessário
    const hasRequiredContent = !showOnlyWithContent || contentExists
    
    // Verifica se não é uma página de navegação ou utilitária
    const isContentPage = !router.pathname.includes('/search') &&
                         !router.pathname.includes('/menu') &&
                         !router.pathname.includes('/settings')
    
    setShouldRender(hasEnoughContent && isValidPage && hasRequiredContent && isContentPage)
  }, [router.pathname, showOnlyWithContent, contentExists])

  if (!shouldRender || !isProduction) {
    return null
  }

  return (
    <Box 
      my={6}
      p={4}
      minH="120px"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm"
      position="relative"
      role="complementary"
      aria-label="Anúncio"
    >
      <Script
        id="adsbygoogle-script"
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-5527070421339032"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          minHeight: '100px',
          backgroundColor: 'transparent'
        }}
        data-ad-client="ca-pub-5527070421339032"
        data-ad-slot="2465814381"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsense-init" strategy="lazyOnload">
        {`
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error('AdSense error:', e);
          }
        `}
      </Script>
    </Box>
  )
} 