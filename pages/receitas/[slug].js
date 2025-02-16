import Head from 'next/head'
import { Box, Container, Heading, Text, VStack, SimpleGrid, Link, useColorModeValue } from '@chakra-ui/react'
import { slugify, getReceitasSlugs } from '../../utils/receitas'
import ShareButtons from '../../components/ShareButtons'
import AdComponent from '../../components/AdComponent'

export default function ReceitaPage({ receita, receitasRelacionadas }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const baseUrl = 'https://receitadodia.vercel.app'

  if (!receita) {
    return <Box>Receita não encontrada</Box>
  }

  const schemaOrgRecipe = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": receita.nome,
    "image": receita.imagem,
    "description": `Aprenda a fazer ${receita.nome} de forma fácil e deliciosa`,
    "keywords": `${receita.nome.toLowerCase()}, receita, culinária, como fazer`,
    "author": {
      "@type": "Organization",
      "name": "Receita do Dia"
    },
    "datePublished": new Date().toISOString().split('T')[0],
    "prepTime": receita.prepTime,
    "cookTime": receita.cookTime,
    "totalTime": receita.totalTime,
    "recipeYield": receita.porcoes,
    "recipeCategory": "Prato Principal",
    "recipeCuisine": "Portuguesa",
    "recipeIngredient": receita.ingredientes,
    "recipeInstructions": receita.modoPreparo.split('\n').map(step => ({
      "@type": "HowToStep",
      "text": step.replace(/^\d+\.\s*/, ''),
      "position": parseInt(step.match(/^\d+/)?.[0] || "1")
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "servingSize": "1 porção",
      "calories": receita.informacoesNutricionais?.calorias,
      "fatContent": receita.informacoesNutricionais?.gorduras,
      "saturatedFatContent": receita.informacoesNutricionais?.gordurasSaturadas,
      "carbohydrateContent": receita.informacoesNutricionais?.carboidratos,
      "proteinContent": receita.informacoesNutricionais?.proteinas,
      "fiberContent": receita.informacoesNutricionais?.fibras,
      "sodiumContent": receita.informacoesNutricionais?.sodio
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1",
      "bestRating": "5",
      "worstRating": "1"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/receitas/${receita.slug}`
    },
    "suitableForDiet": receita.categoria === "vegano" 
      ? "VeganDiet" 
      : receita.categoria === "vegetariano" 
        ? "VegetarianDiet" 
        : null,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Dicas de Preparo",
        "value": receita.dicas?.join(". ")
      }
    ],
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": receita.faq?.map(item => ({
        "@type": "Question",
        "name": item.pergunta,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.resposta
        }
      }))
    }
  }

  return (
    <>
      <Head>
        <title>{`${receita.nome} - Receita Fácil e Deliciosa | Receita do Dia`}</title>
        <meta 
          name="description" 
          content={`Aprenda a fazer ${receita.nome} de forma fácil e deliciosa. Receita completa com lista de ingredientes, modo de preparo passo a passo e dicas. Tempo de preparo: ${receita.tempoPreparo}.`} 
        />
        <meta 
          name="keywords" 
          content={`${receita.nome.toLowerCase()}, como fazer ${receita.nome.toLowerCase()}, receita de ${receita.nome.toLowerCase()}, receita fácil, culinária, passo a passo ${receita.nome.toLowerCase()}`} 
        />
        <link rel="canonical" href={`${baseUrl}/receitas/${receita.slug}`} />
        
        <meta property="og:title" content={`${receita.nome} - Receita Fácil e Deliciosa | Receita do Dia`} />
        <meta property="og:description" content={`Aprenda a fazer ${receita.nome} de forma fácil e deliciosa. Receita completa com ingredientes e modo de preparo passo a passo.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/receitas/${receita.slug}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": receita.nome,
              "image": receita.imagem,
              "description": `Aprenda a fazer ${receita.nome} de forma fácil e deliciosa`,
              "keywords": `${receita.nome.toLowerCase()}, receita, culinária, como fazer`,
              "author": {
                "@type": "Organization",
                "name": "Receita do Dia"
              },
              "datePublished": new Date().toISOString().split('T')[0],
              "prepTime": receita.prepTime,
              "cookTime": receita.cookTime,
              "totalTime": receita.totalTime,
              "recipeYield": receita.porcoes,
              "recipeCategory": "Prato Principal",
              "recipeCuisine": "Portuguesa",
              "recipeIngredient": receita.ingredientes,
              "recipeInstructions": receita.modoPreparo.split('\n').map(step => ({
                "@type": "HowToStep",
                "text": step.replace(/^\d+\.\s*/, ''),
                "position": parseInt(step.match(/^\d+/)?.[0] || "1")
              })),
              "nutrition": {
                "@type": "NutritionInformation",
                "servingSize": "1 porção",
                "calories": receita.informacoesNutricionais?.calorias,
                "fatContent": receita.informacoesNutricionais?.gorduras,
                "saturatedFatContent": receita.informacoesNutricionais?.gordurasSaturadas,
                "carbohydrateContent": receita.informacoesNutricionais?.carboidratos,
                "proteinContent": receita.informacoesNutricionais?.proteinas,
                "fiberContent": receita.informacoesNutricionais?.fibras,
                "sodiumContent": receita.informacoesNutricionais?.sodio
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "1",
                "bestRating": "5",
                "worstRating": "1"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${baseUrl}/receitas/${receita.slug}`
              },
              "suitableForDiet": receita.categoria === "vegano" 
                ? "VeganDiet" 
                : receita.categoria === "vegetariano" 
                  ? "VegetarianDiet" 
                  : null,
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "Dicas de Preparo",
                  "value": receita.dicas?.join(". ")
                }
              ],
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": receita.faq?.map(item => ({
                  "@type": "Question",
                  "name": item.pergunta,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.resposta
                  }
                }))
              }
            }, null, 2)
          }}
        />
      </Head>

      <Box 
        bgGradient="linear(to-br, orange.50, teal.50, orange.50)" 
        minH="100vh" 
        py={10}
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
        <Container maxW="container.md">
          <VStack spacing={8}>
            <Box 
              w="100%" 
              p={8} 
              borderRadius="xl"
              boxShadow="xl"
              bg={cardBg}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
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
                  🍳 {receita.nome}
                </Text>
              </Box>

              <Box mb={6} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                <Text fontSize="lg" mb={2}>
                  ⏱️ <strong>Tempo de Preparo:</strong> {receita.tempoPreparo}
                </Text>
                <Text fontSize="lg">
                  👥 <strong>Porções:</strong> {receita.porcoes}
                </Text>
                <Text fontSize="lg">
                  ⭐ <strong>Dificuldade:</strong> {receita.dificuldade}
                </Text>
                <Box mt={4}>
                  <Text fontSize="sm" mb={2}>Compartilhe esta receita:</Text>
                  <ShareButtons 
                    title={receita.nome} 
                    url={`${baseUrl}/receitas/${receita.slug}`} 
                  />
                </Box>
              </Box>

              <Box mb={6}>
                <Heading as="h2" size="md" mb={4} color="teal.400">
                  🥘 Ingredientes:
                </Heading>
                <Box pl={4}>
                  {receita.ingredientes.map((ingrediente, index) => (
                    <Text 
                      key={index} 
                      fontSize="lg" 
                      mb={2}
                      display="flex"
                      alignItems="center"
                    >
                      <Box as="span" mr={2}>•</Box>
                      {ingrediente}
                    </Text>
                  ))}
                </Box>
              </Box>

              <Box>
                <Heading as="h2" size="md" mb={4} color="teal.400">
                  👩‍🍳 Modo de Preparo:
                </Heading>
                <Text 
                  whiteSpace="pre-line" 
                  fontSize="lg"
                  pl={4}
                >
                  {receita.modoPreparo}
                </Text>
              </Box>

              <Box mb={6}>
                <Heading as="h2" size="md" mb={4} color="teal.400">
                  📊 Informações Nutricionais:
                </Heading>
                <Box pl={4}>
                  {receita.informacoesNutricionais && (
                    <SimpleGrid columns={[2, 3, 4]} spacing={4}>
                      <Box>
                        <Text fontWeight="bold">Calorias:</Text>
                        <Text>{receita.informacoesNutricionais.calorias}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Proteínas:</Text>
                        <Text>{receita.informacoesNutricionais.proteinas}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Carboidratos:</Text>
                        <Text>{receita.informacoesNutricionais.carboidratos}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Gorduras:</Text>
                        <Text>{receita.informacoesNutricionais.gorduras}</Text>
                      </Box>
                    </SimpleGrid>
                  )}
                </Box>
              </Box>

              {receita.dicas && (
                <Box mb={6}>
                  <Heading as="h2" size="md" mb={4} color="teal.400">
                    💡 Dicas de Preparo:
                  </Heading>
                  <Box pl={4}>
                    {receita.dicas.map((dica, index) => (
                      <Text 
                        key={index} 
                        fontSize="lg" 
                        mb={2}
                        display="flex"
                        alignItems="center"
                      >
                        <Box as="span" mr={2}>•</Box>
                        {dica}
                      </Text>
                    ))}
                  </Box>
                </Box>
              )}

              {receita.faq && (
                <Box mb={6}>
                  <Heading as="h2" size="md" mb={4} color="teal.400">
                    ❓ Perguntas Frequentes:
                  </Heading>
                  <Box pl={4}>
                    {receita.faq.map((item, index) => (
                      <Box key={index} mb={4}>
                        <Text fontWeight="bold" fontSize="lg">{item.pergunta}</Text>
                        <Text fontSize="lg" mt={2}>{item.resposta}</Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              <AdComponent contentExists={true} />

              {receitasRelacionadas.length > 0 && (
                <Box mt={8}>
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    📚 Receitas Relacionadas:
                  </Heading>
                  <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {receitasRelacionadas.map((receita) => (
                      <Link
                        key={receita.slug}
                        href={`/receitas/${receita.slug}`}
                        p={3}
                        borderRadius="md"
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        _hover={{
                          textDecoration: 'none',
                          bg: useColorModeValue('gray.100', 'gray.600'),
                          transform: 'translateY(-2px)',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Text fontWeight="medium">{receita.nome}</Text>
                      </Link>
                    ))}
                  </SimpleGrid>
                </Box>
              )}
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export async function getStaticPaths() {
  const receitas = getReceitasSlugs()
  
  const paths = receitas.map((receita) => ({
    params: { slug: receita.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const receitas = [
    {
      nome: "Frango Grelhado com Legumes",
      tempoPreparo: "30 minutos",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      imagem: "https://source.unsplash.com/featured/?grilled,chicken",
      ingredientes: [
        "4 filés de frango",
        "2 cenouras médias cortadas em rodelas",
        "2 abobrinhas médias em cubos",
        "1 cebola em fatias",
        "3 dentes de alho picados",
        "2 colheres de sopa de azeite",
        "Sal e pimenta a gosto",
        "Temperos frescos (tomilho, alecrim) a gosto"
      ],
      modoPreparo: "1. Tempere os filés de frango com sal, pimenta e alho\n2. Aqueça uma frigideira grande com 1 colher de azeite\n3. Grelhe o frango por 5-7 minutos de cada lado\n4. Reserve o frango\n5. Na mesma frigideira, adicione o restante do azeite\n6. Refogue a cebola até ficar transparente\n7. Adicione as cenouras e cozinhe por 5 minutos\n8. Acrescente a abobrinha e cozinhe por mais 3 minutos\n9. Tempere os legumes com sal e pimenta\n10. Sirva o frango com os legumes e decore com os temperos frescos"
    },
    // ... outras receitas ...
  ]

  const receita = receitas.find(r => slugify(r.nome) === slug)
  
  // Encontra 3 receitas relacionadas aleatórias
  const receitasRelacionadas = receitas
    .filter(r => slugify(r.nome) !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(r => ({
      nome: r.nome,
      slug: slugify(r.nome)
    }))

  if (!receita) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      receita,
      receitasRelacionadas,
    },
    revalidate: 86400, // Revalidate once per day
  }
} 