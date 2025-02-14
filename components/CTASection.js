import { Box, Button, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'

export default function CTASection() {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} py={12}>
      <Container maxW="container.md">
        <VStack spacing={6} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: '2xl', sm: '3xl' }}
            bgGradient="linear(to-r, teal.400, orange.400)"
            bgClip="text"
          >
            Descubra Novas Receitas Todo Dia
          </Heading>
          
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
            O Receita do Dia é seu assistente culinário pessoal! Aqui você encontra:
          </Text>
          
          <Box>
            <VStack align="start" spacing={3} fontSize="md">
              <Text>✨ Receitas novas e aleatórias todos os dias</Text>
              <Text>📝 Instruções detalhadas e fáceis de seguir</Text>
              <Text>⏱️ Tempos de preparo e porções</Text>
              <Text>🥘 Variedade de pratos para todos os gostos</Text>
            </VStack>
          </Box>

          <Button
            colorScheme="teal"
            size="lg"
            rounded="full"
            px={8}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Descobrir Receita Agora
          </Button>

          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} maxW="lg">
            Todas as receitas são cuidadosamente selecionadas e testadas para garantir o melhor resultado na sua cozinha.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
} 