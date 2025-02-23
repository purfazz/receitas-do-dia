import Head from 'next/head'
import { Box, Button, Container, Heading, Text, VStack, useColorModeValue, SimpleGrid, List, ListItem, HStack, Link } from '@chakra-ui/react'
import { useState } from 'react'
import AdComponent from '../components/AdComponent'
import AdsterraAd from '../components/AdsterraAd'
import CTASection from '../components/CTASection'
import IngredientTips from '../components/IngredientTips'
import NewsletterForm from '../components/NewsletterForm'
import LearningResources from '../components/LearningResources'
import NextLink from 'next/link'

export default function Home({ receitas }) {
  const [receitaDoDia, setReceitaDoDia] = useState(null)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [dietaSelecionada, setDietaSelecionada] = useState('todas')
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  const escolherReceita = () => {
    let receitasFiltradas = receitas
    if (dietaSelecionada !== 'todas') {
      receitasFiltradas = receitas.filter(receita => receita.dieta === dietaSelecionada)
    }
    
    let novaReceita;
    do {
      novaReceita = receitasFiltradas[Math.floor(Math.random() * receitasFiltradas.length)]
    } while (receitaDoDia && novaReceita?.nome === receitaDoDia.nome && receitasFiltradas.length > 1)
    
    setReceitaDoDia(novaReceita)
  }

  const handleDicasChef = (ingrediente) => {
    setSelectedIngredient(ingrediente)
  }

  return (
    <>
      <Head>
        <title>Receita do Dia - Descubra Novas Receitas Todos os Dias | Receitas Fáceis</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Receita do Dia: Encontre receitas deliciosas e fáceis de fazer todos os dias. Receitas veganas, vegetarianas, fitness e tradicionais. Dicas de chef, informações nutricionais e passo a passo detalhado para suas receitas favoritas." />
        <meta name="keywords" content="receita do dia, receitas fáceis, receitas rápidas, receitas saudáveis, receitas veganas, receitas vegetarianas, receitas fitness, receitas low carb, receitas para o dia a dia, receitas caseiras, receitas simples, receitas práticas, dicas de culinária, gastronomia" />
        <meta name="author" content="Receita do Dia" />
        <meta name="language" content="pt-BR" />
        <meta name="revisit-after" content="1 day" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Receita do Dia - Descubra Novas Receitas Todos os Dias | Receitas Fáceis" />
        <meta property="og:description" content="Encontre receitas deliciosas e fáceis de fazer todos os dias. Receitas veganas, vegetarianas, fitness e tradicionais com dicas exclusivas de chefs profissionais." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://receitadodia.vercel.app" />
        <meta property="og:image" content="https://receitadodia.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Receita do Dia" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Receita do Dia - Novas Receitas Diárias | Receitas Fáceis" />
        <meta name="twitter:description" content="Descubra receitas incríveis todos os dias. Receitas veganas, vegetarianas, fitness e tradicionais com dicas de chefs." />
        <meta name="twitter:image" content="https://receitadodia.vercel.app/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://receitadodia.vercel.app" />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to required origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Receita do Dia",
              "description": "Site de receitas com foco em alimentação saudável e sustentável",
              "url": "https://receitadodia.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://receitadodia.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Receita do Dia",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://receitadodia.com/logo.png"
                }
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": ${JSON.stringify(receitas.map((receita, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Recipe",
                    "name": receita.nome,
                    "description": `Aprenda a fazer ${receita.nome} de forma saudável e deliciosa`,
                    "cookTime": `PT${receita.tempoPreparo.split(' ')[0]}M`,
                    "recipeYield": receita.porcoes,
                    "recipeCategory": receita.dieta === "vegano" ? "Vegano" : receita.dieta === "vegetariano" ? "Vegetariano" : "Tradicional",
                    "recipeCuisine": "Brasileira",
                    "recipeIngredient": receita.ingredientes,
                    "recipeInstructions": receita.modoPreparo.split('\n').map(step => ({
                      "@type": "HowToStep",
                      "text": step.replace(/^\d+\.\s*/, '')
                    })),
                    "author": {
                      "@type": "Organization",
                      "name": "Receita do Dia"
                    },
                    "datePublished": new Date().toISOString().split('T')[0],
                    "image": receita.imagem,
                    "nutrition": receita.informacoesNutricionais ? {
                      "@type": "NutritionInformation",
                      "calories": receita.informacoesNutricionais.calorias,
                      "proteinContent": receita.informacoesNutricionais.proteinas,
                      "carbohydrateContent": receita.informacoesNutricionais.carboidratos,
                      "fatContent": receita.informacoesNutricionais.gorduras,
                      "fiberContent": receita.informacoesNutricionais.fibras,
                      "sodiumContent": receita.informacoesNutricionais.sodio
                    } : undefined
                  }
                })))}
              }
            }`
          }}
        />
      </Head>

      <Box 
        minH="100vh" 
        py={10}
        bgGradient="linear(to-br, orange.50, teal.50, orange.50)"
        backgroundSize="400% 400%"
        animation="gradient 15s ease infinite"
        sx={{
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          }
        }}
      >
        {/* Hero Section */}
        <Box
          position="relative"
          height="400px"
          mb={10}
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundImage="url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f')"
            backgroundPosition="center"
            backgroundSize="cover"
            filter="brightness(0.6)"
          />
          
          <Container maxW="container.xl" height="100%" position="relative">
            <VStack
              height="100%"
              justify="center"
              align="flex-start"
              spacing={4}
              color="white"
              px={4}
            >
              <Heading 
                as="h1" 
                size="2xl"
                fontWeight="extrabold"
                textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                maxW="800px"
                lineHeight="1.2"
              >
                Descubra Receitas Deliciosas e Saudáveis Todo Dia
              </Heading>
              <Text 
                fontSize="xl"
                textShadow="1px 1px 2px rgba(0,0,0,0.5)"
                maxW="600px"
                lineHeight="1.6"
              >
                Explore nossa coleção de receitas cuidadosamente selecionadas, com ingredientes frescos e sabores incríveis.
              </Text>
            </VStack>
          </Container>
        </Box>

        <Container maxW="container.md">
          <VStack spacing={8} align="center">
            <Box textAlign="center">
              <Text 
                fontSize="xl" 
                color="gray.600"
                fontWeight="medium"
                mb={6}
              >
                Escolha a sua preferência alimentar e descubra receitas incríveis
              </Text>

              <HStack spacing={4} justify="center" mb={6} flexWrap="wrap" gap={2}>
                <Button
                  colorScheme={dietaSelecionada === 'todas' ? 'teal' : 'gray'}
                  onClick={() => setDietaSelecionada('todas')}
                  size="lg"
                  variant={dietaSelecionada === 'todas' ? 'solid' : 'outline'}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                >
                  Todas as Receitas
                </Button>
                <Button
                  colorScheme={dietaSelecionada === 'vegano' ? 'green' : 'gray'}
                  onClick={() => setDietaSelecionada('vegano')}
                  size="lg"
                  variant={dietaSelecionada === 'vegano' ? 'solid' : 'outline'}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url('https://images.unsplash.com/photo-1520869578617-557561d7b114')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: dietaSelecionada === 'vegano' ? '0.15' : '0.1',
                    transition: 'opacity 0.2s'
                  }}
                >
                  <Text position="relative" zIndex={1}>
                    Vegano 🌱
                  </Text>
                </Button>
                <Button
                  colorScheme={dietaSelecionada === 'vegetariano' ? 'green' : 'gray'}
                  onClick={() => setDietaSelecionada('vegetariano')}
                  size="lg"
                  variant={dietaSelecionada === 'vegetariano' ? 'solid' : 'outline'}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: dietaSelecionada === 'vegetariano' ? '0.3' : '0.2',
                    transition: 'opacity 0.2s'
                  }}
                >
                  <Text position="relative" zIndex={1}>
                    Vegetariano 🥗
                  </Text>
                </Button>
                <Button
                  colorScheme={dietaSelecionada === 'onivoro' ? 'orange' : 'gray'}
                  onClick={() => setDietaSelecionada('onivoro')}
                  size="lg"
                  variant={dietaSelecionada === 'onivoro' ? 'solid' : 'outline'}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url('https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: dietaSelecionada === 'onivoro' ? '0.15' : '0.1',
                    transition: 'opacity 0.2s'
                  }}
                >
                  <Text position="relative" zIndex={1}>
                    Omnívoro 🍖
                  </Text>
                </Button>
              </HStack>
            </Box>

            <Button 
              colorScheme="teal"
              size="lg"
              onClick={escolherReceita}
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
              shadow="md"
            >
              {!receitaDoDia ? "Descobrir Receita do Dia" : "Tentar Outra Receita"}
            </Button>

            {receitaDoDia && (
              <Box 
                w="100%" 
                p={8} 
                borderRadius="xl"
                boxShadow="xl"
                bg={cardBg}
                transition="all 0.5s"
                animation="fadeIn 0.5s ease-in"
                _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                sx={{
                  '@keyframes fadeIn': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(20px)'
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    }
                  }
                }}
              >
                <Box 
                  width="100%" 
                  height="200px" 
                  mb={6} 
                  borderRadius="lg"
                  bgGradient="linear(to-r, teal.400, orange.300)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgGradient: 'radial(circle, whiteAlpha.300, transparent)',
                    transform: 'scale(1.2)',
                  }}
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="white"
                    textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                    zIndex={1}
                  >
                    🍳 {receitaDoDia.nome}
                  </Text>
                </Box>

                <Heading as="h2" size="lg" mb={6} color="teal.500">
                  {receitaDoDia.nome}
                </Heading>

                <Box mb={6} p={4} bg={hoverBg} borderRadius="md">
                  <Text fontSize="lg" mb={2}>
                    ⏱️ <strong>Tempo de Preparação:</strong> {receitaDoDia.tempoPreparo}
                  </Text>
                  <Text fontSize="lg">
                    �� <strong>Porções:</strong> {receitaDoDia.porcoes}
                  </Text>
                  <Text fontSize="lg">
                    ⭐ <strong>Dificuldade:</strong> {receitaDoDia.dificuldade}
                  </Text>
                </Box>

                <Box>
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    🥘 Ingredientes:
                  </Heading>
                  <Box pl={4}>
                    {receitaDoDia.ingredientes.map((ingrediente, index) => (
                      <Box 
                        key={index} 
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mb={2}
                        p={2}
                        borderRadius="md"
                        _hover={{ bg: hoverBg }}
                      >
                        <Text fontSize="lg">
                          <Box as="span" mr={2}>•</Box>
                          {ingrediente}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="orange"
                          variant="outline"
                          leftIcon={<Box as="span">👩‍🍳</Box>}
                          onClick={() => handleDicasChef(ingrediente)}
                        >
                          Dicas do Chefe
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    👩‍🍳 Modo de Preparação:
                  </Heading>
                  <Text 
                    whiteSpace="pre-line" 
                    fontSize="lg"
                    pl={4}
                  >
                    {receitaDoDia.modoPreparo}
                  </Text>
                </Box>

                {/* Seção de Informações Nutricionais */}
                {receitaDoDia.informacoesNutricionais && (
                  <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                    <Heading as="h3" size="md" mb={4} color="teal.400">
                      📊 Informações Nutricionais:
                    </Heading>
                    <SimpleGrid columns={[2, 3]} spacing={4}>
                      <Box>
                        <Text fontWeight="bold">Calorias:</Text>
                        <Text>{receitaDoDia.informacoesNutricionais.calorias}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Proteínas:</Text>
                        <Text>{receitaDoDia.informacoesNutricionais.proteinas}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Hidratos de Carbono:</Text>
                        <Text>{receitaDoDia.informacoesNutricionais.carboidratos}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Gorduras:</Text>
                        <Text>{receitaDoDia.informacoesNutricionais.gorduras}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Fibras:</Text>
                        <Text>{receitaDoDia.informacoesNutricionais.fibras}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Sódio:</Text>
                        <Text>{receitaDoDia.informacoesNutricionais.sodio}</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                )}

                {/* Seção de Benefícios para a Saúde */}
                {receitaDoDia.beneficiosSaude && (
                  <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                    <Heading as="h3" size="md" mb={4} color="teal.400">
                      💪 Benefícios para a Saúde:
                    </Heading>
                    <List spacing={2}>
                      {receitaDoDia.beneficiosSaude.map((beneficio, index) => (
                        <ListItem 
                          key={index}
                          display="flex"
                          alignItems="center"
                        >
                          <Box as="span" mr={2}>•</Box>
                          {beneficio}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Seção de Dicas do Chef */}
                {receitaDoDia.dicas && (
                  <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                    <Heading as="h3" size="md" mb={4} color="teal.400">
                      👨‍🍳 Dicas do Chefe:
                    </Heading>
                    <List spacing={2}>
                      {receitaDoDia.dicas.map((dica, index) => (
                        <ListItem 
                          key={index}
                          display="flex"
                          alignItems="center"
                        >
                          <Box as="span" mr={2}>•</Box>
                          {dica}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Seção de Tempo de Preparo Detalhado */}
                <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    ⏲️ Tempo de Preparo Detalhado:
                  </Heading>
                  <SimpleGrid columns={[1, 3]} spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Preparo:</Text>
                      <Text>15 minutos</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Cozimento:</Text>
                      <Text>25 minutos</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Total:</Text>
                      <Text>{receitaDoDia.tempoPreparo}</Text>
                    </Box>
                  </SimpleGrid>
                </Box>

                {/* Seção de Utensílios Necessários */}
                <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    🍳 Utensílios Necessários:
                  </Heading>
                  <SimpleGrid columns={[2, 3, 4]} spacing={4}>
                    {["Panela grande", "Tábua de corte", "Faca afiada", "Colher de pau", "Escorredor", "Tigelas"].map((utensilio, index) => (
                      <Box key={index} p={2} bg="white" borderRadius="md" shadow="sm">
                        <Text>{utensilio}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Seção de Variações da Receita */}
                <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    🔄 Variações da Receita:
                  </Heading>
                  <List spacing={2}>
                    <ListItem>Versão sem glúten: Substitua a farinha de trigo por farinha de arroz</ListItem>
                    <ListItem>Versão sem lactose: Use queijos sem lactose ou substitutos vegetais</ListItem>
                    <ListItem>Versão mais leve: Asse em vez de fritar</ListItem>
                  </List>
                </Box>

                {/* Seção de Harmonização */}
                <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    🍷 Harmonização:
                  </Heading>
                  <List spacing={2}>
                    <ListItem>Vinho: Sugestão de vinho tinto meio seco</ListItem>
                    <ListItem>Sobremesa: Combina bem com sobremesas leves</ListItem>
                    <ListItem>Acompanhamentos: Arroz branco, salada verde</ListItem>
                  </List>
                </Box>

                {/* Seção de Dicas de Armazenamento */}
                <Box mt={6} p={4} bg={hoverBg} borderRadius="md">
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    🗄️ Armazenamento:
                  </Heading>
                  <List spacing={2}>
                    <ListItem>Geladeira: Conserva por até 3 dias em recipiente fechado</ListItem>
                    <ListItem>Freezer: Pode ser congelado por até 2 meses</ListItem>
                    <ListItem>Como reaquecer: Instruções para melhor resultado</ListItem>
                  </List>
                </Box>
              </Box>
            )}

            {!receitaDoDia && <CTASection />}

            {/* Seção de Recursos Educacionais */}
            <Box w="full" p={6} bg={cardBg} borderRadius="xl" boxShadow="xl">
              <Heading as="h2" size="lg" mb={4} color="teal.500">
                 Recursos para Aprender
              </Heading>
              <LearningResources />
            </Box>

            {/* Seção de Política de Privacidade */}
            <Box w="full" p={6} bg={cardBg} borderRadius="xl" boxShadow="xl" fontSize="sm" color="gray.600">
              <Text mb={2}>
                Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
                <NextLink href="/privacidade" passHref legacyBehavior>
                  <Box
                    as="a"
                    color="teal.500"
                    display="inline"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Política de Privacidade
                  </Box>
                </NextLink>
                .
              </Text>
            </Box>

            {/* Nova Seção: Dicas Culinárias */}
            <Box w="full" p={6} bg={cardBg} borderRadius="xl" boxShadow="xl">
              <Heading as="h2" size="lg" mb={4} color="teal.500">
                Dicas Culinárias Essenciais
              </Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading as="h3" size="md" mb={2} color="teal.400">
                    Preparação e Organização
                  </Heading>
                  <Text>
                    Antes de começar qualquer receita, leia-a completamente e separe todos os ingredientes e utensílios necessários. 
                    Esta prática, conhecida como "mise en place", é fundamental para um processo de cozimento tranquilo e bem-sucedido. 
                    Mantenha sua área de trabalho limpa e organizada para maior eficiência e segurança na cozinha.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={2} color="teal.400">
                    Técnicas de Corte
                  </Heading>
                  <Text>
                    Desenvolver boas habilidades com a faca é essencial para qualquer cozinheiro. Mantenha suas facas sempre afiadas 
                    e aprenda as técnicas básicas de corte: julienne, brunoise, chiffonade e corte em cubos. Isso não só melhorará 
                    a apresentação dos seus pratos, mas também garantirá um cozimento mais uniforme dos ingredientes.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={2} color="teal.400">
                    Temperos e Sabores
                  </Heading>
                  <Text>
                    A arte de temperar vai além do sal e pimenta. Experimente diferentes ervas e especiarias, mas adicione-as 
                    gradualmente para não sobrecarregar o prato. Lembre-se: você sempre pode adicionar mais tempero, mas é 
                    impossível removê-lo depois de exagerar. Aprenda a equilibrar os sabores básicos: doce, salgado, ácido, 
                    amargo e umami.
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Nova Seção: Benefícios da Alimentação Saudável */}
            <Box w="full" p={6} bg={cardBg} borderRadius="xl" boxShadow="xl">
              <Heading as="h2" size="lg" mb={4} color="teal.500">
                Benefícios da Alimentação Saudável
              </Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading as="h3" size="md" mb={2} color="teal.400">
                    Saúde e Bem-estar
                  </Heading>
                  <Text>
                    Uma alimentação equilibrada é fundamental para manter a saúde do corpo e da mente. Consumir uma variedade 
                    de alimentos nutritivos ajuda a fortalecer o sistema imunológico, manter os níveis de energia estáveis e 
                    prevenir diversas doenças. Além disso, uma dieta saudável contribui para melhor qualidade do sono, humor 
                    mais estável e maior disposição para atividades diárias.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={2} color="teal.400">
                    Sustentabilidade
                  </Heading>
                  <Text>
                    Optar por uma alimentação consciente também beneficia o meio ambiente. Escolher ingredientes locais e 
                    sazonais reduz a pegada de carbono, enquanto diminuir o consumo de alimentos ultraprocessados ajuda a 
                    reduzir o impacto ambiental da produção alimentícia. Além disso, planejar refeições ajuda a evitar o 
                    desperdício de alimentos.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={2} color="teal.400">
                    Aspectos Sociais
                  </Heading>
                  <Text>
                    Cozinhar e compartilhar refeições são atividades que fortalecem laços sociais e familiares. Preparar 
                    uma refeição saudável pode ser uma atividade prazerosa e relaxante, além de ser uma oportunidade de 
                    transmitir conhecimentos culinários entre gerações e criar memórias afetivas duradouras.
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Nova Seção: Recursos Adicionais */}
            <Box w="full" p={6} bg={cardBg} borderRadius="xl" boxShadow="xl">
              <Heading as="h2" size="lg" mb={4} color="teal.500">
                Recursos Adicionais
              </Heading>
              <Text>
                Para mais informações sobre monetização e anúncios, visite o site da Adsterra: 
                <Link color="teal.500" href="https://www.effectiveratecpm.com/btedt3hxme?key=13288d358fbf97b949e5cb98f2ef2355" isExternal>
                  Adsterra
                </Link>.
              </Text>
            </Box>

            <AdsterraAd />
            <AdComponent />
          </VStack>
        </Container>
      </Box>

      {/* Modal de Dicas do Chef */}
      {selectedIngredient && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          maxW="600px"
          w="90%"
          zIndex={1000}
        >
          <IngredientTips 
            ingredient={selectedIngredient}
            onClose={() => setSelectedIngredient(null)}
          />
        </Box>
      )}
    </>
  )
}

export async function getStaticProps() {
  const receitas = [
    // Receitas Onívoras
    {
      nome: "Frango à Parmegiana",
      tempoPreparo: "45 minutos",
      porcoes: "4 porções",
      dificuldade: "Médio",
      dieta: "onivoro",
      imagem: "https://source.unsplash.com/featured/?chicken,parmesan",
      ingredientes: [
        "4 filés de frango (cerca de 150g cada)",
        "2 ovos batidos",
        "2 xícaras de farinha de rosca",
        "1 xícara de queijo parmesão ralado",
        "2 xícaras de molho de tomate caseiro",
        "200g de queijo mussarela",
        "Sal e pimenta a gosto",
        "Óleo para fritar",
        "2 dentes de alho picados",
        "Orégano a gosto"
      ],
      modoPreparo: "1. Tempere os filés com sal, pimenta e alho picado. Deixe marinar por 15 minutos\n2. Prepare três pratos: um com farinha de trigo, outro com os ovos batidos, e o terceiro com a mistura de farinha de rosca\n3. Passe cada filé primeiro na farinha, depois no ovo e por último na mistura de farinha de rosca\n4. Aqueça o óleo em fogo médio\n5. Frite os filés até ficarem dourados dos dois lados (cerca de 4-5 minutos cada lado)\n6. Coloque os filés em uma forma\n7. Cubra cada filé com molho de tomate e fatias de mussarela\n8. Polvilhe orégano a gosto\n9. Leve ao forno preaquecido a 180°C por 10-15 minutos ou até o queijo derreter\n10. Sirva quente, acompanhado de arroz e salada",
      informacoesNutricionais: {
        calorias: "450 kcal por porção",
        proteinas: "38g",
        carboidratos: "25g",
        gorduras: "22g",
        fibras: "2g",
        sodio: "680mg"
      },
      dicas: [
        "Para um frango mais suculento, deixe marinar por mais tempo",
        "O molho de tomate caseiro dá mais sabor que o industrializado",
        "Você pode usar o forno para dourar em vez de fritar, tornando a receita mais saudável"
      ],
      beneficiosSaude: [
        "Rico em proteínas para construção muscular",
        "Fonte de cálcio pelo queijo",
        "Contém licopeno do molho de tomate"
      ]
    },
    {
      nome: "Picanha na Churrasqueira",
      tempoPreparo: "40 minutos",
      porcoes: "6 porções",
      dificuldade: "Médio",
      dieta: "onivoro",
      imagem: "https://loremflickr.com/800/600/picanha,beef",
      ingredientes: [
        "1 peça de picanha (1,2kg)",
        "Sal grosso a gosto",
        "Pimenta do reino moída",
        "Alho em pó (opcional)",
        "Azeite"
      ],
      modoPreparo: "1. Tempere a picanha\n2. Pré-aqueça a churrasqueira\n3. Grelhe com a gordura para cima\n4. Vire após dourar\n5. Deixe no ponto desejado"
    },
    {
      nome: "Salmão ao Molho de Maracujá",
      tempoPreparo: "35 minutos",
      porcoes: "4 porções",
      dificuldade: "Médio",
      dieta: "onivoro",
      imagem: "https://source.unsplash.com/featured/?salmon",
      ingredientes: [
        "4 filés de salmão (180g cada)",
        "2 maracujás maduros",
        "200ml de creme de leite fresco",
        "1 colher de manteiga",
        "Sal e pimenta do reino a gosto",
        "Ervas frescas (dill, salsinha)",
        "1 limão",
        "2 dentes de alho",
        "Azeite de oliva extra virgem"
      ],
      modoPreparo: "1. Tempere os filés de salmão com sal, pimenta e suco de limão\n2. Aqueça uma frigideira antiaderente com azeite\n3. Sele os filés por 4-5 minutos de cada lado\n4. Para o molho, extraia a polpa dos maracujás\n5. Em uma panela, derreta a manteiga e refogue o alho\n6. Adicione a polpa de maracujá e deixe reduzir\n7. Acrescente o creme de leite e cozinhe em fogo baixo\n8. Tempere o molho com sal e pimenta\n9. Sirva o salmão regado com o molho\n10. Decore com ervas frescas",
      informacoesNutricionais: {
        calorias: "380 kcal por porção",
        proteinas: "32g",
        carboidratos: "8g",
        gorduras: "25g",
        fibras: "1g",
        sodio: "320mg"
      },
      dicas: [
        "Escolha salmão fresco com cor viva e brilhante",
        "O ponto ideal do salmão é quando ele está levemente rosado no centro",
        "Você pode substituir o maracujá por laranja ou limão siciliano"
      ],
      beneficiosSaude: [
        "Rico em ômega-3 para saúde cardiovascular",
        "Fonte de vitamina D",
        "Antioxidantes do maracujá"
      ]
    },
    {
      nome: "Feijoada Tradicional",
      tempoPreparo: "180 minutos",
      porcoes: "8 porções",
      dificuldade: "Difícil",
      dieta: "onivoro",
      imagem: "https://loremflickr.com/800/600/feijoada",
      ingredientes: [
        "1kg de feijão preto",
        "Carnes variadas",
        "Linguiça",
        "Bacon",
        "Temperos tradicionais",
        "Laranjas para acompanhar"
      ],
      modoPreparo: "1. Deixe o feijão de molho\n2. Cozinhe as carnes\n3. Junte tudo\n4. Cozinhe até ficar macio"
    },
    {
      nome: "Strogonoff de Carne",
      tempoPreparo: "40 minutos",
      porcoes: "6 porções",
      dificuldade: "Fácil",
      dieta: "onivoro",
      imagem: "https://loremflickr.com/800/600/beef,stroganoff",
      ingredientes: [
        "700g de carne em tiras",
        "2 cebolas",
        "3 dentes de alho",
        "200g de champignons",
        "2 caixas de creme de leite",
        "Catchup e mostarda",
        "Batata palha"
      ],
      modoPreparo: "1. Refogue a carne\n2. Adicione os temperos\n3. Finalize com creme de leite\n4. Sirva com arroz e batata palha"
    },

    // Novas Receitas Veganas
    {
      nome: "Lasanha de Berinjela Vegana",
      tempoPreparo: "60 minutos",
      porcoes: "6 porções",
      dificuldade: "Médio",
      dieta: "vegano",
      imagem: "https://source.unsplash.com/featured/?eggplant,lasagna",
      ingredientes: [
        "3 berinjelas grandes fatiadas",
        "500ml de molho de tomate caseiro",
        "200g de queijo vegano ralado",
        "400g de tofu firme amassado",
        "300g de espinafre fresco",
        "2 dentes de alho picados",
        "1 cebola média picada",
        "2 colheres de sopa de azeite",
        "Manjericão fresco",
        "Sal e pimenta a gosto",
        "Noz moscada a gosto"
      ],
      modoPreparo: "1. Pré-aqueça o forno a 180°C\n2. Fatie as berinjelas em lâminas finas\n3. Grelhe as fatias de berinjela com um pouco de azeite até ficarem macias\n4. Para o recheio, refogue a cebola e o alho no azeite\n5. Adicione o espinafre e cozinhe até murchar\n6. Misture o tofu amassado com temperos e noz moscada\n7. Em um refratário, monte camadas: molho, berinjela, mistura de tofu, espinafre\n8. Repita as camadas finalizando com molho e queijo vegano\n9. Cubra com papel alumínio e asse por 30 minutos\n10. Retire o papel e asse por mais 15 minutos até dourar",
      informacoesNutricionais: {
        calorias: "280 kcal por porção",
        proteinas: "15g",
        carboidratos: "18g",
        gorduras: "12g",
        fibras: "8g",
        sodio: "390mg"
      },
      dicas: [
        "Escolha berinjelas firmes e brilhantes",
        "Você pode salgar as fatias de berinjela antes para reduzir o amargor",
        "O tofu firme é melhor para esta receita pois mantém a textura"
      ],
      beneficiosSaude: [
        "Baixo teor calórico",
        "Rica em fibras e antioxidantes",
        "Fonte de proteína vegetal",
        "Sem colesterol"
      ]
    },
    {
      nome: "Curry de Grão de Bico",
      tempoPreparo: "45 minutos",
      porcoes: "6 porções",
      dificuldade: "Fácil",
      dieta: "vegano",
      imagem: "https://source.unsplash.com/featured/?chickpea,curry",
      ingredientes: [
        "2 latas de grão de bico (400g cada)",
        "400ml de leite de coco",
        "2 cebolas médias picadas",
        "4 dentes de alho",
        "2cm de gengibre fresco",
        "2 colheres de sopa de curry em pó",
        "1 colher de chá de cúrcuma",
        "1 colher de chá de cominho",
        "2 tomates maduros picados",
        "Coentro fresco",
        "Sal e pimenta a gosto",
        "Azeite de oliva"
      ],
      modoPreparo: "1. Escorra e enxágue o grão de bico\n2. Em uma panela grande, refogue a cebola no azeite até dourar\n3. Adicione alho e gengibre ralados e cozinhe por 2 minutos\n4. Acrescente as especiarias e cozinhe até liberar o aroma\n5. Adicione os tomates e cozinhe até amolecerem\n6. Acrescente o grão de bico e o leite de coco\n7. Deixe cozinhar em fogo baixo por 20 minutos\n8. Ajuste os temperos\n9. Finalize com coentro fresco\n10. Sirva com arroz basmati",
      informacoesNutricionais: {
        calorias: "320 kcal por porção",
        proteinas: "12g",
        carboidratos: "35g",
        gorduras: "16g",
        fibras: "9g",
        sodio: "280mg"
      },
      dicas: [
        "Use grão de bico cozido al dente para melhor textura",
        "As especiarias podem ser ajustadas ao seu gosto",
        "Guarde as sobras na geladeira por até 3 dias"
      ],
      beneficiosSaude: [
        "Rico em proteínas e fibras",
        "Propriedades anti-inflamatórias da cúrcuma",
        "Fonte de ferro e vitaminas do complexo B",
        "Baixo índice glicêmico"
      ]
    },

    // Novas Receitas Vegetarianas
    {
      nome: "Torta de Espinafre",
      tempoPreparo: "50 minutos",
      porcoes: "8 fatias",
      dificuldade: "Médio",
      dieta: "vegetariano",
      imagem: "https://loremflickr.com/800/600/spinach,pie",
      ingredientes: [
        "Massa de torta",
        "500g de espinafre",
        "3 ovos",
        "Queijo ralado",
        "Cebola e alho",
        "Temperos"
      ],
      modoPreparo: "1. Prepare a massa\n2. Refogue o recheio\n3. Monte e asse"
    },
    {
      nome: "Penne ao Molho Rose",
      tempoPreparo: "30 minutos",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      dieta: "vegetariano",
      imagem: "https://loremflickr.com/800/600/pasta,rose",
      ingredientes: [
        "500g de penne",
        "Molho de tomate",
        "Creme de leite",
        "Queijo parmesão",
        "Manjericão"
      ],
      modoPreparo: "1. Cozinhe a massa\n2. Prepare o molho\n3. Misture e sirva"
    },

    // Novas Receitas Fitness
    {
      nome: "Bowl de Açaí Proteico",
      tempoPreparo: "10 minutos",
      porcoes: "2 porções",
      dificuldade: "Fácil",
      dieta: "vegano",
      imagem: "https://source.unsplash.com/featured/?acai,bowl",
      ingredientes: [
        "400g de polpa de açaí",
        "1 banana congelada",
        "30g de whey protein vegano",
        "200ml de leite de amêndoas",
        "Granola low carb",
        "Frutas vermelhas",
        "Sementes de chia",
        "Mel (opcional)"
      ],
      modoPreparo: "1. No liquidificador, bata o açaí, banana e leite\n2. Adicione o whey protein e bata novamente\n3. Despeje em bowls\n4. Decore com granola, frutas e sementes",
      informacoesNutricionais: {
        calorias: "320 kcal por porção",
        proteinas: "24g",
        carboidratos: "42g",
        gorduras: "12g",
        fibras: "8g",
        sodio: "80mg"
      },
      dicas: [
        "Use frutas congeladas para textura mais cremosa",
        "Prepare a granola em casa para controlar o açúcar",
        "Adicione colágeno em pó para mais proteína"
      ],
      beneficiosSaude: [
        "Rico em antioxidantes",
        "Alto teor de proteínas",
        "Ótimo pré ou pós treino",
        "Fonte de energia natural"
      ]
    },
    {
      nome: "Omelete Fit de Claras",
      tempoPreparo: "15 minutos",
      porcoes: "1 porção",
      dificuldade: "Fácil",
      dieta: "vegetariano",
      imagem: "https://source.unsplash.com/featured/?omelette",
      ingredientes: [
        "4 claras de ovo",
        "1 tomate picado",
        "1/2 cebola picada",
        "Espinafre fresco",
        "Queijo cottage",
        "Sal e pimenta a gosto",
        "Orégano",
        "Azeite de oliva"
      ],
      modoPreparo: "1. Bata as claras até ficarem espumosas\n2. Adicione os temperos\n3. Aqueça uma frigideira antiaderente\n4. Despeje as claras e adicione os recheios\n5. Cozinhe em fogo médio\n6. Dobre ao meio e sirva",
      informacoesNutricionais: {
        calorias: "180 kcal",
        proteinas: "22g",
        carboidratos: "6g",
        gorduras: "8g",
        fibras: "2g",
        sodio: "320mg"
      },
      dicas: [
        "Use frigideira antiaderente para não precisar de muito óleo",
        "Adicione ervas frescas para mais sabor",
        "Prepare os recheios antes de começar"
      ],
      beneficiosSaude: [
        "Alto teor de proteína",
        "Baixo em gorduras",
        "Rico em vitaminas",
        "Ideal para dietas"
      ]
    },
    {
      nome: "Brownie Proteico de Batata Doce",
      tempoPreparo: "45 minutos",
      porcoes: "12 porções",
      dificuldade: "Médio",
      dieta: "vegetariano",
      imagem: "https://source.unsplash.com/featured/?brownie",
      ingredientes: [
        "2 batatas doces médias cozidas",
        "4 ovos",
        "1/2 xícara de cacau em pó",
        "2 scoops de whey protein chocolate",
        "3 colheres de sopa de mel",
        "1 colher de chá de fermento",
        "Essência de baunilha",
        "Canela em pó"
      ],
      modoPreparo: "1. Pré-aqueça o forno a 180°C\n2. Amasse as batatas doces\n3. Misture com ovos, mel e baunilha\n4. Adicione cacau, whey e canela\n5. Por último, coloque o fermento\n6. Asse em forma untada por 25-30 minutos",
      informacoesNutricionais: {
        calorias: "120 kcal por porção",
        proteinas: "8g",
        carboidratos: "15g",
        gorduras: "4g",
        fibras: "3g",
        sodio: "45mg"
      },
      dicas: [
        "Não bata demais a massa após adicionar o fermento",
        "Faça o teste do palito para verificar o ponto",
        "Guarde na geladeira por até 5 dias"
      ],
      beneficiosSaude: [
        "Fonte de proteína e fibras",
        "Carboidratos complexos",
        "Sem açúcar refinado",
        "Rico em betacaroteno"
      ]
    }
  ]

  return {
    props: {
      receitas
    },
    revalidate: 86400
  }
} 