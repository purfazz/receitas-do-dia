import Head from 'next/head'
import { Box, Container, Heading, Text, VStack, UnorderedList, ListItem, useColorModeValue } from '@chakra-ui/react'

export default function Termos() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  return (
    <>
      <Head>
        <title>Termos de Uso - Receita do Dia</title>
        <meta name="description" content="Termos de uso do site Receita do Dia. Conheça as regras e condições para utilização do nosso serviço." />
        <meta name="robots" content="noindex, follow" />
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
              Termos de Uso
            </Heading>

            <Box w="full" p={8} bg={cardBg} borderRadius="xl" boxShadow="xl">
              <VStack spacing={6} align="start">
                <Text>
                  Bem-vindo ao Receita do Dia. Ao acessar e usar nosso site, você concorda com estes termos de uso.
                </Text>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    1. Aceitação dos Termos
                  </Heading>
                  <Text>
                    Ao acessar e usar o Receita do Dia, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nosso site.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    2. Uso do Conteúdo
                  </Heading>
                  <UnorderedList spacing={2}>
                    <ListItem>Todo o conteúdo é apenas para uso pessoal e não comercial</ListItem>
                    <ListItem>Não é permitido copiar, modificar ou distribuir nosso conteúdo sem autorização</ListItem>
                    <ListItem>As receitas podem ser compartilhadas desde que citada a fonte</ListItem>
                  </UnorderedList>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    3. Contas de Usuário
                  </Heading>
                  <Text>
                    Ao criar uma conta em nosso site, você é responsável por manter a confidencialidade de suas informações de login e por todas as atividades que ocorrem em sua conta.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    4. Propriedade Intelectual
                  </Heading>
                  <Text>
                    Todo o conteúdo presente no site, incluindo textos, imagens, receitas, logos e design, são de propriedade do Receita do Dia ou de seus parceiros e estão protegidos por leis de direitos autorais.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    5. Publicidade
                  </Heading>
                  <Text>
                    O site pode exibir anúncios de terceiros, incluindo o Google AdSense. Estes anúncios podem coletar e usar informações sobre suas visitas conforme descrito em nossa Política de Privacidade.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    6. Limitação de Responsabilidade
                  </Heading>
                  <UnorderedList spacing={2}>
                    <ListItem>Não nos responsabilizamos por resultados obtidos ao seguir as receitas</ListItem>
                    <ListItem>As informações nutricionais são aproximadas</ListItem>
                    <ListItem>Consulte um profissional de saúde antes de iniciar qualquer dieta</ListItem>
                  </UnorderedList>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    7. Modificações
                  </Heading>
                  <Text>
                    Reservamos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após sua publicação no site.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="teal.500">
                    8. Contato
                  </Heading>
                  <Text>
                    Para questões relacionadas a estes termos, entre em contato através do email: termos@receitadodia.com
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