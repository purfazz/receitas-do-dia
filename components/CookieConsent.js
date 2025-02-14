import { useEffect, useState } from 'react'
import { Box, Button, Text, Stack, useColorModeValue } from '@chakra-ui/react'

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Verifica se já existe consentimento
    const hasConsent = localStorage.getItem('cookieConsent')
    if (!hasConsent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowConsent(false)
    // Ativa o GA e AdSense após consentimento
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      })
    }
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false')
    setShowConsent(false)
    // Desativa o GA e AdSense
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      })
    }
  }

  if (!showConsent) return null

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      p={4}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="lg"
      zIndex={999}
    >
      <Box maxW="container.lg" mx="auto">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Text fontSize="sm">
            Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, 
            analisar o tráfego e personalizar o conteúdo. Ao clicar em "Aceitar", 
            você concorda com o uso de todos os cookies. Você pode ajustar suas 
            preferências a qualquer momento.
          </Text>
          <Stack direction="row" spacing={4}>
            <Button
              size="sm"
              colorScheme="gray"
              onClick={handleReject}
            >
              Rejeitar
            </Button>
            <Button
              size="sm"
              colorScheme="teal"
              onClick={handleAccept}
            >
              Aceitar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
} 