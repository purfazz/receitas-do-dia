import { Box, useColorModeValue } from '@chakra-ui/react'
import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function AdsterraAd() {
  const [shouldRender, setShouldRender] = useState(false)
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  useEffect(() => {
    // Verifica se está em produção
    const isProduction = process.env.NODE_ENV === 'production'
    
    // Verifica se a página tem conteúdo substancial
    const hasEnoughContent = document.body.innerText.length > 800
    
    // Atualiza o estado baseado nas condições
    setShouldRender(isProduction && hasEnoughContent)
  }, [])

  if (!shouldRender) {
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
        id="adsterra-script"
        strategy="lazyOnload"
        src="//pl25946813.effectiveratecpm.com/c4/f9/17/c4f9173d9f99cf49f3fd9e75b4ab3f85.js"
      />
    </Box>
  )
} 