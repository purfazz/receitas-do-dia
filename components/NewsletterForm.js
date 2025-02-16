import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido')
      setIsLoading(false)
      return
    }

    // Simula o envio do email
    try {
      // Aqui você pode adicionar a lógica real de inscrição
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Inscrição realizada com sucesso!',
        description: 'Você receberá nossas novidades em breve.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      setEmail('')
    } catch (err) {
      setError('Erro ao realizar inscrição. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <HStack spacing={4}>
        <FormControl isInvalid={!!error}>
          <Input
            type="email"
            placeholder="Seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            bg={useColorModeValue('white', 'gray.700')}
            _hover={{
              borderColor: 'teal.300'
            }}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="teal"
          size="lg"
          type="submit"
          isLoading={isLoading}
          loadingText="Enviando..."
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          Inscrever-se
        </Button>
      </HStack>
    </Box>
  )
} 