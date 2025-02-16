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
    
    // Verifica se a página tem conteúdo substancial (pelo menos 800 caracteres)
    const hasEnoughContent = document.body.innerText.length > 800
    
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
    
    // Verifica se o usuário está engajado (scroll > 25%)
    const checkEngagement = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      return scrollPercentage > 25
    }
    
    // Atualiza o estado baseado em todas as condições
    const updateShouldRender = () => {
      setShouldRender(
        hasEnoughContent && 
        isValidPage && 
        hasRequiredContent && 
        isContentPage && 
        checkEngagement()
      )
    }
    
    // Adiciona listener de scroll
    window.addEventListener('scroll', updateShouldRender)
    // Chama inicialmente
    updateShouldRender()
    
    // Cleanup
    return () => window.removeEventListener('scroll', updateShouldRender)
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
      sx={{
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s'
        }
      }}
    >
      <Script
        id="adsbygoogle-script"
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-5527070421339032"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('AdSense script failed to load:', e)
          // Tenta recarregar após 2 segundos
          setTimeout(() => {
            const script = document.createElement('script')
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            script.async = true
            script.crossOrigin = "anonymous"
            script.dataset.adClient = "ca-pub-5527070421339032"
            document.head.appendChild(script)
          }, 2000)
        }}
      />
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          minHeight: '100px',
          backgroundColor: 'transparent',
          margin: '0 auto',
          textAlign: 'center',
          overflow: 'hidden'
        }}
        data-ad-client="ca-pub-5527070421339032"
        data-ad-slot="2465814381"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
      />
      <Script id="adsense-init" strategy="lazyOnload">
        {`
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
            // Monitora viewability
            window.addEventListener('scroll', function() {
              const ads = document.querySelectorAll('.adsbygoogle');
              ads.forEach(ad => {
                const rect = ad.getBoundingClientRect();
                const isVisible = (
                  rect.top >= 0 &&
                  rect.left >= 0 &&
                  rect.bottom <= window.innerHeight &&
                  rect.right <= window.innerWidth
                );
                if (isVisible) {
                  ad.style.backgroundColor = 'transparent';
                }
              });
            });
          } catch (e) {
            console.error('AdSense error:', e);
            // Tenta reinicializar após erro
            setTimeout(() => {
              try {
                (adsbygoogle = window.adsbygoogle || []).push({});
              } catch (retryError) {
                console.error('AdSense retry failed:', retryError);
              }
            }, 2000);
          }
        `}
      </Script>
    </Box>
  )
} 