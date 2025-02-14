import Head from 'next/head'
import { Box, Container, Heading, Text, VStack, List, ListItem, ListIcon, Button, useColorModeValue } from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'
import Link from 'next/link'

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre - Receita do Dia</title>
        <meta name="description" content="Conheça mais sobre o Receita do Dia, seu assistente culinário diário com receitas deliciosas e fáceis de fazer." />
      </Head>

      <Box
        bgGradient="linear(to-br, orange.50, teal.50, orange.50)"
        minH="100vh"
        py={10}
      >
        <Container maxW="container.md">
          <VStack spacing={8} align="start">
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, orange.400, teal.500)"
              bgClip="text"
            >
              Sobre o Receita do Dia
            </Heading>

            <Text fontSize="lg">
              O Receita do Dia nasceu da ideia de simplificar a decisão do que cozinhar, 
              oferecendo sugestões diárias de receitas deliciosas e práticas para todos os gostos.
            </Text>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="teal.500">
                Nossa Missão
              </Heading>
              <Text fontSize="lg">
                Queremos inspirar pessoas a cozinhar mais em casa, descobrindo novas receitas 
                e aprendendo técnicas culinárias de forma simples e divertida.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="teal.500">
                Por que usar o Receita do Dia?
              </Heading>
              <List spacing={3}>
                <ListItem fontSize="lg">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Receitas novas todos os dias
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Instruções passo a passo detalhadas
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Tempos de preparo e porções claros
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Receitas testadas e aprovadas
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Interface simples e intuitiva
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4} color="teal.500">
                Como Funciona
              </Heading>
              <Text fontSize="lg">
                Basta clicar no botão "Descobrir Receita" na página inicial para receber 
                uma sugestão aleatória de receita. Cada receita vem com lista completa de 
                ingredientes, modo de preparo detalhado e dicas úteis.
              </Text>
            </Box>

            <Link href="/" passHref>
              <Button
                as="a"
                colorScheme="teal"
                size="lg"
                mt={4}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Descobrir Receitas
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>
    </>
  )
} 