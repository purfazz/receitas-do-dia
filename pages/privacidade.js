import Head from 'next/head'
import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem, useColorModeValue } from '@chakra-ui/react'

export default function Privacidade() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  return (
    <>
      <Head>
        <title>Política de Privacidade - Receita do Dia</title>
        <meta name="description" content="Política de privacidade do site Receita do Dia. Saiba como tratamos seus dados e protegemos sua privacidade." />
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
              Política de Privacidade
            </Heading>

            <Box w="full" p={8} bg={cardBg} borderRadius="xl" boxShadow="xl">
              <VStack spacing={6} align="start">
                <Text>
                  O Receita do Dia está comprometido em proteger sua privacidade. Esta política descreve como coletamos e usamos suas informações.
                </Text>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    Informações Coletadas
                  </Heading>
                  <UnorderedList spacing={2}>
                    <ListItem>Dados de navegação anônimos para melhorar a experiência do usuário</ListItem>
                    <ListItem>Cookies essenciais para o funcionamento do site</ListItem>
                    <ListItem>Informações fornecidas voluntariamente pelos usuários</ListItem>
                  </UnorderedList>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    Uso das Informações
                  </Heading>
                  <UnorderedList spacing={2}>
                    <ListItem>Melhorar nossos serviços e conteúdo</ListItem>
                    <ListItem>Personalizar sua experiência no site</ListItem>
                    <ListItem>Enviar atualizações sobre novas receitas (apenas se solicitado)</ListItem>
                  </UnorderedList>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    Cookies e Tecnologias Similares
                  </Heading>
                  <Text>
                    Utilizamos cookies para melhorar sua experiência de navegação. Você pode controlar o uso de cookies através das configurações do seu navegador.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    Publicidade
                  </Heading>
                  <Text>
                    Este site exibe anúncios fornecidos por terceiros, incluindo o Google AdSense. Estes serviços podem usar cookies para exibir anúncios relevantes.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    Seus Direitos
                  </Heading>
                  <UnorderedList spacing={2}>
                    <ListItem>Acessar seus dados pessoais</ListItem>
                    <ListItem>Solicitar a correção de dados incorretos</ListItem>
                    <ListItem>Solicitar a exclusão de seus dados</ListItem>
                    <ListItem>Retirar seu consentimento a qualquer momento</ListItem>
                  </UnorderedList>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    Contato
                  </Heading>
                  <Text>
                    Para questões relacionadas à privacidade, entre em contato através do email: privacidade@receitadodia.com
                  </Text>
                </Box>

                <Text fontSize="sm" color="gray.600">
                  Última atualização: {new Date().toLocaleDateString()}
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
} 