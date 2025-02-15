import Head from 'next/head'
import { Box, Button, Container, Heading, Text, VStack, useColorModeValue, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import AdComponent from '../components/AdComponent'
import CTASection from '../components/CTASection'
import ShareButtons from '../components/ShareButtons'

export default function Home({ receitas }) {
  const [receitaDoDia, setReceitaDoDia] = useState(null)
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const categorias = [
    { id: 'todas', nome: 'Todas', icon: '🍽️' },
    { id: 'onivoro', nome: 'Onívoro', icon: '🥩' },
    { id: 'vegetariano', nome: 'Vegetariano', icon: '🥗' },
    { id: 'vegano', nome: 'Vegano', icon: '🌱' }
  ]

  const escolherReceita = () => {
    const receitasFiltradas = receitas.filter(receita => 
      filtroCategoria === 'todas' || receita.categoria === filtroCategoria
    )
    
    let novaReceita;
    do {
      novaReceita = receitasFiltradas[Math.floor(Math.random() * receitasFiltradas.length)]
    } while (receitaDoDia && novaReceita?.nome === receitaDoDia.nome && receitasFiltradas.length > 1)
    
    setReceitaDoDia(novaReceita)
  }

  return (
    <>
      <Head>
        <title>Receita do Dia - Descubra Receitas Deliciosas e Fáceis de Fazer</title>
        <meta name="description" content="Encontre receitas deliciosas e fáceis de fazer todos os dias. Receitas caseiras, práticas e testadas para seu almoço, jantar ou sobremesa. Instruções passo a passo!" />
        <meta name="keywords" content="receita do dia, receitas fáceis, receitas caseiras, receitas práticas, receitas rápidas, culinária, como fazer, receitas portuguesas, receitas simples, receitas saudáveis, receitas veganas, receitas doces" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Receita do Dia - Descubra Receitas Deliciosas e Fáceis de Fazer" />
        <meta property="og:description" content="Encontre receitas deliciosas e fáceis de fazer todos os dias. Receitas caseiras, práticas e testadas para seu almoço, jantar ou sobremesa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://receitadodia.vercel.app" />
        <meta property="og:image" content="https://receitadodia.vercel.app/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Receita do Dia - Descubra Receitas Deliciosas" />
        <meta name="twitter:description" content="Encontre receitas deliciosas e fáceis de fazer todos os dias. Receitas caseiras e práticas!" />
        <meta name="twitter:image" content="https://receitadodia.vercel.app/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://receitadodia.vercel.app" />
        
        {/* Schema.org para Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Receita do Dia",
              "description": "Descubra receitas deliciosas e práticas todos os dias",
              "url": "https://receitadodia.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://receitadodia.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Receita do Dia",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://receitadodia.vercel.app/logo.png"
                }
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": receitas.map((receita, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Recipe",
                    "name": receita.nome,
                    "description": `Aprenda a fazer ${receita.nome} de forma fácil e deliciosa`,
                    "cookTime": `PT${receita.tempoPreparo.split(' ')[0]}M`,
                    "recipeYield": receita.porcoes,
                    "recipeCategory": "Prato Principal",
                    "recipeCuisine": "Portuguesa",
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
                    "nutrition": {
                      "@type": "NutritionInformation",
                      "servingSize": "1 porção"
                    }
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
            '0%': {
              backgroundPosition: '0% 50%'
            },
            '50%': {
              backgroundPosition: '100% 50%'
            },
            '100%': {
              backgroundPosition: '0% 50%'
            }
          }
        }}
      >
        <Container maxW="container.md">
          <VStack spacing={8} align="center">
            <Box textAlign="center">
              <Heading 
                as="h1" 
                size="2xl" 
                bgGradient="linear(to-r, orange.400, teal.500)"
                bgClip="text"
                mb={4}
                letterSpacing="tight"
                fontWeight="extrabold"
                _hover={{
                  bgGradient: "linear(to-r, teal.500, orange.400)",
                  transition: "all 0.5s ease"
                }}
                css={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  "@media (min-width: 48em)": {
                    fontSize: "4.5rem"
                  }
                }}
              >
                Receita do Dia
              </Heading>
              <Text 
                fontSize="xl" 
                color="gray.600"
                fontWeight="medium"
                textShadow="0 1px 2px rgba(0,0,0,0.1)"
              >
                {!receitaDoDia 
                  ? "Clique no botão abaixo para descobrir uma receita deliciosa!"
                  : "Descubra uma nova receita deliciosa hoje!"
                }
              </Text>
            </Box>

            <HStack spacing={4} wrap="wrap" justify="center">
              {categorias.map((cat) => (
                <Button
                  key={cat.id}
                  colorScheme={filtroCategoria === cat.id ? 'teal' : 'gray'}
                  onClick={() => setFiltroCategoria(cat.id)}
                  leftIcon={<Text>{cat.icon}</Text>}
                >
                  {cat.nome}
                </Button>
              ))}
            </HStack>

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

            <AdComponent />

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

                <Box mb={6} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                  <Text fontSize="lg" mb={2}>
                    ⏱️ <strong>Tempo de Preparo:</strong> {receitaDoDia.tempoPreparo}
                  </Text>
                  <Text fontSize="lg">
                    👥 <strong>Porções:</strong> {receitaDoDia.porcoes}
                  </Text>
                  <Text fontSize="lg">
                    ⭐ <strong>Dificuldade:</strong> {receitaDoDia.dificuldade}
                  </Text>
                  <Box mt={4}>
                    <Text fontSize="sm" mb={2}>Compartilhe esta receita:</Text>
                    <ShareButtons 
                      title={receitaDoDia.nome}
                      url={`https://receitadodia.vercel.app`}
                    />
                  </Box>
                </Box>

                <Box mb={6}>
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    🥘 Ingredientes:
                  </Heading>
                  <Box pl={4}>
                    {receitaDoDia.ingredientes.map((ingrediente, index) => (
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
                  <Heading as="h3" size="md" mb={4} color="teal.400">
                    👩‍🍳 Modo de Preparo:
                  </Heading>
                  <Text 
                    whiteSpace="pre-line" 
                    fontSize="lg"
                    pl={4}
                  >
                    {receitaDoDia.modoPreparo}
                  </Text>
                </Box>
              </Box>
            )}

            {!receitaDoDia && <CTASection />}
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const receitas = [
    {
      nome: "Frango Grelhado com Legumes",
      tempoPreparo: "30 minutos",
      prepTime: "PT10M",
      cookTime: "PT20M",
      totalTime: "PT30M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "onivoro",
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
      modoPreparo: "1. Tempere os filés de frango com sal, pimenta e alho\n2. Aqueça uma frigideira grande com 1 colher de azeite\n3. Grelhe o frango por 5-7 minutos de cada lado\n4. Reserve o frango\n5. Na mesma frigideira, adicione o restante do azeite\n6. Refogue a cebola até ficar transparente\n7. Adicione as cenouras e cozinhe por 5 minutos\n8. Acrescente a abobrinha e cozinhe por mais 3 minutos\n9. Tempere os legumes com sal e pimenta\n10. Sirva o frango com os legumes e decore com os temperos frescos",
      informacoesNutricionais: {
        calorias: "320",
        gorduras: "12g",
        gordurasSaturadas: "2.5g",
        carboidratos: "8g",
        proteinas: "45g",
        fibras: "3g",
        sodio: "380mg"
      },
      dicas: [
        "Para um frango mais suculento, deixe marinar por 30 minutos antes de grelhar",
        "Você pode substituir os legumes por outros de sua preferência",
        "Para uma versão mais leve, use peito de frango sem pele"
      ],
      faq: [
        {
          pergunta: "Posso preparar o frango no forno?",
          resposta: "Sim! Asse a 200°C por cerca de 25-30 minutos, virando na metade do tempo."
        },
        {
          pergunta: "Como saber se o frango está no ponto?",
          resposta: "O frango está pronto quando estiver dourado por fora e, ao cortar, a carne estiver completamente branca, sem partes rosadas."
        }
      ]
    },
    {
      nome: "Risoto de Cogumelos",
      tempoPreparo: "45 minutos",
      prepTime: "PT15M",
      cookTime: "PT30M",
      totalTime: "PT45M",
      porcoes: "6 porções",
      dificuldade: "Médio",
      categoria: "vegetariano",
      imagem: "https://loremflickr.com/800/600/risotto,mushrooms",
      ingredientes: [
        "2 xícaras de arroz arbóreo",
        "400g de cogumelos variados",
        "1 cebola média picada",
        "3 dentes de alho picados",
        "1/2 xícara de vinho branco seco",
        "4-5 xícaras de caldo de legumes quente",
        "1/2 xícara de queijo parmesão ralado",
        "2 colheres de sopa de manteiga",
        "Sal e pimenta a gosto",
        "Salsinha picada para finalizar"
      ],
      modoPreparo: "1. Em uma panela, aqueça 1 colher de manteiga e refogue os cogumelos até dourarem\n2. Reserve os cogumelos\n3. Na mesma panela, refogue a cebola e o alho\n4. Adicione o arroz e refogue por 2 minutos\n5. Acrescente o vinho branco e mexa até evaporar\n6. Adicione o caldo de legumes, uma concha por vez, mexendo sempre\n7. Continue adicionando o caldo e mexendo até o arroz ficar al dente\n8. Incorpore os cogumelos reservados\n9. Finalize com o queijo parmesão e a manteiga restante\n10. Ajuste o sal e a pimenta\n11. Sirva decorado com salsinha"
    },
    {
      nome: "Bolo de Chocolate Vegano",
      tempoPreparo: "50 minutos",
      prepTime: "PT15M",
      cookTime: "PT35M",
      totalTime: "PT50M",
      porcoes: "8 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?vegan,chocolate,cake",
      ingredientes: [
        "2 xícaras de farinha de trigo",
        "1 xícara de cacau em pó",
        "2 xícaras de açúcar",
        "2 colheres de chá de fermento",
        "1 colher de chá de bicarbonato",
        "1/2 colher de chá de sal",
        "2 xícaras de leite vegetal",
        "1/2 xícara de óleo vegetal",
        "2 colheres de chá de extrato de baunilha",
        "1 colher de sopa de vinagre de maçã"
      ],
      modoPreparo: "1. Pré-aqueça o forno a 180°C\n2. Unte uma forma redonda com óleo e cacau\n3. Em uma tigela, misture todos os ingredientes secos\n4. Em outra tigela, misture todos os ingredientes líquidos\n5. Combine as misturas até formar uma massa homogênea\n6. Despeje na forma preparada\n7. Asse por 35-40 minutos ou até um palito sair limpo\n8. Deixe esfriar antes de desenformar\n9. Decore com ganache vegano se desejar",
      informacoesNutricionais: {
        calorias: "280",
        gorduras: "12g",
        gordurasSaturadas: "1.5g",
        carboidratos: "42g",
        proteinas: "4g",
        fibras: "3g",
        sodio: "250mg"
      },
      dicas: [
        "Para um bolo mais úmido, adicione 1/2 xícara de purê de maçã",
        "O vinagre de maçã reage com o bicarbonato, deixando o bolo mais fofo",
        "Você pode substituir o leite vegetal por água, mas o sabor ficará menos rico"
      ],
      faq: [
        {
          pergunta: "Posso usar outro tipo de farinha?",
          resposta: "Sim, você pode usar farinha integral ou de aveia, mas a textura pode ficar diferente."
        },
        {
          pergunta: "Como fazer o ganache vegano?",
          resposta: "Misture chocolate meio amargo vegano derretido com leite de coco cremoso na proporção 1:1."
        }
      ]
    },
    {
      nome: "Curry de Grão de Bico",
      tempoPreparo: "40 minutos",
      prepTime: "PT10M",
      cookTime: "PT30M",
      totalTime: "PT40M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?curry,chickpea",
      ingredientes: [
        "2 latas de grão de bico",
        "1 lata de leite de coco",
        "2 cebolas picadas",
        "4 dentes de alho",
        "2 colheres de curry em pó",
        "1 colher de gengibre ralado",
        "1 lata de tomate pelado",
        "Coentro fresco",
        "Sal e pimenta a gosto"
      ],
      modoPreparo: "1. Refogue a cebola e o alho\n2. Adicione o curry e o gengibre\n3. Acrescente o tomate e o grão de bico\n4. Adicione o leite de coco\n5. Cozinhe por 20 minutos\n6. Finalize com coentro",
      informacoesNutricionais: {
        calorias: "320",
        gorduras: "14g",
        gordurasSaturadas: "8g",
        carboidratos: "42g",
        proteinas: "12g",
        fibras: "8g",
        sodio: "380mg"
      }
    },
    {
      nome: "Salada de Quinoa com Legumes",
      tempoPreparo: "25 minutos",
      prepTime: "PT10M",
      cookTime: "PT15M",
      totalTime: "PT25M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?quinoa,salad",
      ingredientes: [
        "1 xícara de quinoa",
        "2 cenouras raladas",
        "1 pepino em cubos",
        "1 pimentão vermelho picado",
        "Folhas de hortelã",
        "Suco de 1 limão",
        "Azeite de oliva",
        "Sal e pimenta a gosto"
      ],
      modoPreparo: "1. Cozinhe a quinoa conforme instruções da embalagem\n2. Misture com os legumes\n3. Tempere com limão, azeite, sal e pimenta\n4. Finalize com hortelã",
      informacoesNutricionais: {
        calorias: "220",
        gorduras: "8g",
        gordurasSaturadas: "1g",
        carboidratos: "32g",
        proteinas: "8g",
        fibras: "5g",
        sodio: "180mg"
      }
    },
    {
      nome: "Salmão ao Molho de Limão",
      tempoPreparo: "25 minutos",
      prepTime: "PT10M",
      cookTime: "PT15M",
      totalTime: "PT25M",
      porcoes: "2 porções",
      dificuldade: "Médio",
      categoria: "onivoro",
      imagem: "https://loremflickr.com/800/600/salmon,fish",
      ingredientes: [
        "2 filés de salmão",
        "Suco de 2 limões",
        "2 colheres de sopa de azeite",
        "2 dentes de alho picados",
        "Sal e pimenta a gosto",
        "Ervas frescas (dill, salsinha)"
      ],
      modoPreparo: "1. Tempere os filés com sal e pimenta\n2. Misture o suco de limão, azeite e alho\n3. Regue o salmão com o molho\n4. Asse por 15-20 minutos\n5. Finalize com ervas frescas"
    },
    {
      nome: "Salada Caesar",
      tempoPreparo: "20 minutos",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      imagem: "https://loremflickr.com/800/600/salad",
      ingredientes: [
        "2 corações de alface romana",
        "200g de frango grelhado em tiras",
        "Croutons caseiros",
        "Queijo parmesão ralado",
        "Molho Caesar"
      ],
      modoPreparo: "1. Lave e corte a alface\n2. Grelhe o frango e corte em tiras\n3. Monte a salada com alface, frango e croutons\n4. Finalize com molho e queijo"
    },
    {
      nome: "Smoothie de Frutas Vermelhas",
      tempoPreparo: "5 minutos",
      porcoes: "2 porções",
      dificuldade: "Fácil",
      imagem: "https://loremflickr.com/800/600/smoothie,berries",
      ingredientes: [
        "2 xícaras de frutas vermelhas congeladas",
        "1 banana",
        "1 xícara de iogurte natural",
        "1 colher de mel",
        "1/2 xícara de leite"
      ],
      modoPreparo: "1. Coloque todos os ingredientes no liquidificador\n2. Bata até ficar cremoso\n3. Sirva imediatamente"
    },
    {
      nome: "Lasanha à Bolonhesa",
      tempoPreparo: "90 minutos",
      porcoes: "8 porções",
      dificuldade: "Médio",
      imagem: "https://loremflickr.com/800/600/lasagna",
      ingredientes: [
        "Massa de lasanha",
        "500g de carne moída",
        "Molho de tomate",
        "Molho bechamel",
        "Queijo mussarela",
        "Queijo parmesão"
      ],
      modoPreparo: "1. Prepare o molho bolonhesa\n2. Prepare o molho bechamel\n3. Monte camadas alternadas\n4. Asse por 45 minutos"
    },
    {
      nome: "Pão de Queijo",
      tempoPreparo: "30 minutos",
      porcoes: "20 unidades",
      dificuldade: "Fácil",
      imagem: "https://loremflickr.com/800/600/cheese,bread",
      ingredientes: [
        "500g de polvilho azedo",
        "1 xícara de leite",
        "1/2 xícara de óleo",
        "2 ovos",
        "200g de queijo minas curado ralado",
        "Sal a gosto"
      ],
      modoPreparo: "1. Ferva leite com óleo\n2. Escalde o polvilho\n3. Adicione ovos e queijo\n4. Modele e asse"
    },
    {
      nome: "Mousse de Maracujá",
      tempoPreparo: "15 minutos",
      porcoes: "6 porções",
      dificuldade: "Fácil",
      imagem: "https://loremflickr.com/800/600/mousse,dessert",
      ingredientes: [
        "1 lata de leite condensado",
        "1 lata de suco de maracujá",
        "1 lata de creme de leite",
        "Polpa de maracujá para decorar"
      ],
      modoPreparo: "1. Bata o leite condensado e o suco no liquidificador\n2. Adicione o creme de leite\n3. Despeje em taças\n4. Leve à geladeira por 4 horas\n5. Decore com polpa de maracujá"
    },
    {
      nome: "Strogonoff de Frango",
      tempoPreparo: "40 minutos",
      prepTime: "PT15M",
      cookTime: "PT25M",
      totalTime: "PT40M",
      porcoes: "6 porções",
      dificuldade: "Médio",
      categoria: "onivoro",
      imagem: "https://loremflickr.com/800/600/chicken,strogonoff",
      ingredientes: [
        "800g de frango em cubos",
        "2 cebolas",
        "3 dentes de alho",
        "200g de champignons",
        "2 caixas de creme de leite",
        "4 colheres de ketchup",
        "2 colheres de mostarda",
        "Batata palha para servir"
      ],
      modoPreparo: "1. Refogue o frango com cebola e alho\n2. Adicione os champignons\n3. Acrescente creme de leite, ketchup e mostarda\n4. Sirva com batata palha"
    },
    {
      nome: "Tapioca com Queijo e Presunto",
      tempoPreparo: "10 minutos",
      porcoes: "1 porção",
      dificuldade: "Fácil",
      imagem: "https://loremflickr.com/800/600/tapioca,food",
      ingredientes: [
        "3 colheres de goma de tapioca",
        "2 fatias de queijo",
        "2 fatias de presunto",
        "Orégano a gosto"
      ],
      modoPreparo: "1. Aqueça uma frigideira\n2. Espalhe a goma de tapioca\n3. Quando firmar, vire\n4. Adicione queijo e presunto\n5. Dobre e sirva"
    },
    {
      nome: "Brigadeiro Gourmet",
      tempoPreparo: "30 minutos",
      porcoes: "30 unidades",
      dificuldade: "Médio",
      imagem: "https://loremflickr.com/800/600/chocolate,brigadeiro",
      ingredientes: [
        "2 latas de leite condensado",
        "200g de chocolate 70% cacau",
        "1 colher de manteiga",
        "Chocolate granulado para decorar"
      ],
      modoPreparo: "1. Derreta o chocolate em banho-maria\n2. Misture com leite condensado e manteiga\n3. Cozinhe até soltar do fundo\n4. Deixe esfriar\n5. Faça as bolinhas e passe no granulado"
    },
    {
      nome: "Yakisoba",
      tempoPreparo: "45 minutos",
      porcoes: "4 porções",
      dificuldade: "Médio",
      imagem: "https://loremflickr.com/800/600/noodles,yakisoba",
      ingredientes: [
        "400g de macarrão para yakisoba",
        "300g de carne em tiras",
        "Legumes variados",
        "Molho shoyu",
        "Óleo de gergelim"
      ],
      modoPreparo: "1. Cozinhe o macarrão\n2. Refogue a carne\n3. Adicione os legumes\n4. Misture o macarrão\n5. Finalize com molho shoyu e óleo de gergelim"
    },
    {
      nome: "Feijoada Completa",
      tempoPreparo: "180 minutos",
      prepTime: "PT30M",
      cookTime: "PT150M",
      totalTime: "PT180M",
      porcoes: "10 porções",
      dificuldade: "Difícil",
      categoria: "onivoro",
      imagem: "https://loremflickr.com/800/600/feijoada,beans",
      ingredientes: [
        "1kg de feijão preto",
        "Carnes variadas (costela, paio, linguiça)",
        "2 laranjas",
        "Couve refogada",
        "Arroz branco",
        "Farofa"
      ],
      modoPreparo: "1. Deixe o feijão de molho\n2. Cozinhe com as carnes\n3. Prepare os acompanhamentos\n4. Sirva com laranja"
    },
    {
      nome: "Pizza Margherita",
      tempoPreparo: "60 minutos",
      porcoes: "8 fatias",
      dificuldade: "Médio",
      imagem: "https://loremflickr.com/800/600/pizza,margherita",
      ingredientes: [
        "Massa de pizza",
        "Molho de tomate",
        "Mussarela de búfala",
        "Manjericão fresco",
        "Azeite de oliva"
      ],
      modoPreparo: "1. Abra a massa\n2. Espalhe o molho\n3. Adicione queijo\n4. Asse em forno alto\n5. Finalize com manjericão"
    },
    {
      nome: "Ceviche de Peixe",
      tempoPreparo: "30 minutos",
      prepTime: "PT20M",
      cookTime: "PT10M",
      totalTime: "PT30M",
      porcoes: "4 porções",
      dificuldade: "Médio",
      categoria: "onivoro",
      imagem: "https://loremflickr.com/800/600/ceviche,fish",
      ingredientes: [
        "500g de peixe branco",
        "6 limões",
        "1 cebola roxa",
        "Coentro fresco",
        "Pimenta a gosto"
      ],
      modoPreparo: "1. Corte o peixe em cubos\n2. Marine com limão\n3. Adicione cebola e temperos\n4. Sirva gelado"
    },
    {
      nome: "Brownie de Chocolate",
      tempoPreparo: "45 minutos",
      porcoes: "12 porções",
      dificuldade: "Médio",
      imagem: "https://loremflickr.com/800/600/brownie,chocolate",
      ingredientes: [
        "200g de chocolate meio amargo",
        "200g de manteiga",
        "4 ovos",
        "200g de açúcar",
        "100g de farinha"
      ],
      modoPreparo: "1. Derreta chocolate e manteiga\n2. Misture ovos e açúcar\n3. Adicione farinha\n4. Asse por 25 minutos"
    },
    {
      nome: "Pad Thai",
      tempoPreparo: "40 minutos",
      porcoes: "4 porções",
      dificuldade: "Médio",
      imagem: "https://loremflickr.com/800/600/padthai,noodles",
      ingredientes: [
        "Macarrão de arroz",
        "Camarões",
        "Broto de feijão",
        "Amendoim",
        "Molho de tamarindo"
      ],
      modoPreparo: "1. Hidrate o macarrão\n2. Prepare o molho\n3. Refogue os ingredientes\n4. Misture tudo\n5. Finalize com amendoim"
    },
    {
      nome: "Bacalhau à Brás",
      tempoPreparo: "45 minutos",
      prepTime: "PT15M",
      cookTime: "PT30M",
      totalTime: "PT45M",
      porcoes: "4 porções",
      dificuldade: "Médio",
      categoria: "onivoro",
      imagem: "https://source.unsplash.com/featured/?cod,fish",
      ingredientes: [
        "400g de bacalhau desfiado",
        "500g de batata palha",
        "6 ovos",
        "2 cebolas grandes",
        "3 dentes de alho",
        "Salsa picada",
        "Azeitonas pretas",
        "Azeite",
        "Sal e pimenta a gosto"
      ],
      modoPreparo: "1. Refogue a cebola e o alho no azeite\n2. Adicione o bacalhau e refogue\n3. Junte a batata palha\n4. Bata os ovos e adicione\n5. Mexa até os ovos estarem cozidos\n6. Finalize com salsa e azeitonas"
    },
    {
      nome: "Bolo de Cenoura com Cobertura de Chocolate",
      tempoPreparo: "50 minutos",
      porcoes: "12 fatias",
      dificuldade: "Fácil",
      imagem: "https://source.unsplash.com/featured/?carrot,cake",
      ingredientes: [
        "3 cenouras médias",
        "4 ovos",
        "1 xícara de óleo",
        "2 xícaras de açúcar",
        "2 xícaras de farinha de trigo",
        "1 colher de fermento",
        "200g de chocolate meio amargo",
        "1 lata de creme de leite"
      ],
      modoPreparo: "1. Bata no liquidificador as cenouras, ovos e óleo\n2. Misture com açúcar e farinha\n3. Adicione o fermento\n4. Asse por 40 minutos\n5. Para a cobertura, derreta o chocolate\n6. Misture com creme de leite\n7. Cubra o bolo"
    },
    {
      nome: "Caldo Verde",
      tempoPreparo: "60 minutos",
      porcoes: "6 porções",
      dificuldade: "Fácil",
      imagem: "https://source.unsplash.com/featured/?soup,green",
      ingredientes: [
        "1kg de batatas",
        "400g de couve portuguesa",
        "2 cebolas",
        "3 dentes de alho",
        "200g de linguiça portuguesa",
        "Azeite",
        "Sal a gosto"
      ],
      modoPreparo: "1. Cozinhe as batatas com as cebolas\n2. Bata no liquidificador\n3. Corte a couve em tiras finas\n4. Frite a linguiça\n5. Adicione a couve ao caldo\n6. Finalize com azeite"
    },
    {
      nome: "Pastel de Nata",
      tempoPreparo: "90 minutos",
      porcoes: "12 unidades",
      dificuldade: "Difícil",
      imagem: "https://source.unsplash.com/featured/?pastry,custard",
      ingredientes: [
        "Massa folhada",
        "500ml de leite",
        "6 gemas",
        "200g de açúcar",
        "Casca de limão",
        "Canela em pau",
        "2 colheres de farinha"
      ],
      modoPreparo: "1. Prepare o creme com leite e gemas\n2. Forre forminhas com massa folhada\n3. Preencha com o creme\n4. Asse em forno muito quente\n5. Polvilhe com canela"
    },
    {
      nome: "Arroz com Lentilha e Legumes",
      tempoPreparo: "35 minutos",
      prepTime: "PT10M",
      cookTime: "PT25M",
      totalTime: "PT35M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?lentils,rice",
      ingredientes: [
        "1 xícara de lentilha",
        "2 xícaras de arroz",
        "1 cebola picada",
        "2 cenouras em cubos",
        "1 abobrinha em cubos",
        "3 dentes de alho",
        "Azeite",
        "Sal e pimenta a gosto",
        "Cheiro verde"
      ],
      modoPreparo: "1. Cozinhe a lentilha em água por 15 minutos\n2. Em outra panela, refogue alho e cebola\n3. Adicione o arroz e refogue\n4. Acrescente água quente e cozinhe\n5. Refogue os legumes separadamente\n6. Misture tudo e finalize com cheiro verde",
      informacoesNutricionais: {
        calorias: "280",
        gorduras: "4g",
        gordurasSaturadas: "0.5g",
        carboidratos: "52g",
        proteinas: "10g",
        fibras: "7g",
        sodio: "180mg"
      }
    },
    {
      nome: "Sopa de Legumes com Macarrão",
      tempoPreparo: "30 minutos",
      prepTime: "PT10M",
      cookTime: "PT20M",
      totalTime: "PT30M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?vegetable,soup",
      ingredientes: [
        "1 pacote de macarrão tipo padre nosso",
        "2 batatas em cubos",
        "2 cenouras em rodelas",
        "1 cebola picada",
        "2 tomates picados",
        "Couve em tiras",
        "2 dentes de alho",
        "Sal e temperos a gosto"
      ],
      modoPreparo: "1. Refogue alho e cebola\n2. Adicione os legumes e água\n3. Cozinhe até os legumes ficarem macios\n4. Acrescente o macarrão\n5. Finalize com a couve",
      informacoesNutricionais: {
        calorias: "220",
        gorduras: "2g",
        gordurasSaturadas: "0.3g",
        carboidratos: "45g",
        proteinas: "7g",
        fibras: "4g",
        sodio: "150mg"
      }
    },
    {
      nome: "Farofa de Proteína de Soja",
      tempoPreparo: "20 minutos",
      prepTime: "PT5M",
      cookTime: "PT15M",
      totalTime: "PT20M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?farofa",
      ingredientes: [
        "2 xícaras de farinha de mandioca",
        "1 xícara de proteína de soja",
        "1 cebola picada",
        "3 dentes de alho",
        "Azeite ou óleo",
        "Sal e pimenta a gosto",
        "Cheiro verde"
      ],
      modoPreparo: "1. Hidrate a proteína de soja em água quente\n2. Refogue alho e cebola\n3. Adicione a proteína de soja e tempere\n4. Acrescente a farinha aos poucos\n5. Finalize com cheiro verde",
      informacoesNutricionais: {
        calorias: "180",
        gorduras: "6g",
        gordurasSaturadas: "0.8g",
        carboidratos: "24g",
        proteinas: "8g",
        fibras: "3g",
        sodio: "120mg"
      }
    },
    {
      nome: "Strogonoff de Grão de Bico",
      tempoPreparo: "40 minutos",
      prepTime: "PT10M",
      cookTime: "PT30M",
      totalTime: "PT40M",
      porcoes: "4 porções",
      dificuldade: "Médio",
      categoria: "vegetariano",
      imagem: "https://source.unsplash.com/featured/?chickpea,stew",
      ingredientes: [
        "2 latas de grão de bico",
        "1 cebola grande picada",
        "3 dentes de alho",
        "1 caixa de creme de leite",
        "3 colheres de molho de tomate",
        "1 colher de mostarda",
        "Champignons (opcional)",
        "Sal e pimenta a gosto",
        "Batata palha para servir"
      ],
      modoPreparo: "1. Escorra e lave o grão de bico\n2. Refogue cebola e alho\n3. Adicione o grão de bico e tempere\n4. Acrescente molho de tomate e mostarda\n5. Finalize com creme de leite\n6. Sirva com batata palha",
      informacoesNutricionais: {
        calorias: "310",
        gorduras: "12g",
        gordurasSaturadas: "5g",
        carboidratos: "42g",
        proteinas: "12g",
        fibras: "8g",
        sodio: "280mg"
      }
    },
    {
      nome: "Escondidinho de Mandioca com Lentilha",
      tempoPreparo: "50 minutos",
      prepTime: "PT20M",
      cookTime: "PT30M",
      totalTime: "PT50M",
      porcoes: "6 porções",
      dificuldade: "Médio",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?cassava,lentils",
      ingredientes: [
        "1kg de mandioca cozida",
        "2 xícaras de lentilha",
        "1 cebola grande",
        "4 dentes de alho",
        "2 tomates picados",
        "Azeite",
        "Sal e pimenta a gosto",
        "Cheiro verde",
        "Leite vegetal para o purê"
      ],
      modoPreparo: "1. Cozinhe a lentilha até ficar macia\n2. Faça um purê com a mandioca\n3. Refogue cebola, alho e tomates\n4. Misture com a lentilha e tempere\n5. Monte camadas de purê e lentilha\n6. Asse por 20 minutos",
      informacoesNutricionais: {
        calorias: "290",
        gorduras: "5g",
        gordurasSaturadas: "0.6g",
        carboidratos: "52g",
        proteinas: "11g",
        fibras: "6g",
        sodio: "200mg"
      }
    },
    {
      nome: "Bife à Parmegiana",
      tempoPreparo: "45 minutos",
      prepTime: "PT15M",
      cookTime: "PT30M",
      totalTime: "PT45M",
      porcoes: "4 porções",
      dificuldade: "Médio",
      categoria: "onivoro",
      imagem: "https://source.unsplash.com/featured/?steak,parmesan",
      ingredientes: [
        "4 bifes de contra filé",
        "2 ovos batidos",
        "Farinha de trigo para empanar",
        "Farinha de rosca",
        "Molho de tomate",
        "200g de queijo mussarela",
        "Queijo parmesão ralado",
        "Sal e pimenta a gosto",
        "Óleo para fritar"
      ],
      modoPreparo: "1. Tempere os bifes com sal e pimenta\n2. Passe na farinha de trigo, ovo e farinha de rosca\n3. Frite em óleo quente até dourar\n4. Cubra com molho de tomate e queijos\n5. Leve ao forno para gratinar",
      informacoesNutricionais: {
        calorias: "450",
        gorduras: "22g",
        gordurasSaturadas: "8g",
        carboidratos: "28g",
        proteinas: "42g",
        fibras: "2g",
        sodio: "680mg"
      }
    },
    {
      nome: "Almôndegas ao Sugo",
      tempoPreparo: "40 minutos",
      prepTime: "PT15M",
      cookTime: "PT25M",
      totalTime: "PT40M",
      porcoes: "6 porções",
      dificuldade: "Fácil",
      categoria: "onivoro",
      imagem: "https://source.unsplash.com/featured/?meatballs",
      ingredientes: [
        "500g de carne moída",
        "1 ovo",
        "2 fatias de pão de forma",
        "Leite para umedecer o pão",
        "1 cebola ralada",
        "2 dentes de alho",
        "Salsa picada",
        "500ml de molho de tomate",
        "Sal e pimenta a gosto"
      ],
      modoPreparo: "1. Misture a carne com ovo, pão umedecido, cebola e temperos\n2. Faça bolinhas pequenas\n3. Doure as almôndegas\n4. Adicione o molho de tomate\n5. Cozinhe por 15 minutos",
      informacoesNutricionais: {
        calorias: "320",
        gorduras: "18g",
        gordurasSaturadas: "6g",
        carboidratos: "15g",
        proteinas: "28g",
        fibras: "2g",
        sodio: "520mg"
      }
    },
    {
      nome: "Frango Xadrez",
      tempoPreparo: "35 minutos",
      prepTime: "PT15M",
      cookTime: "PT20M",
      totalTime: "PT35M",
      porcoes: "4 porções",
      dificuldade: "Médio",
      categoria: "onivoro",
      imagem: "https://source.unsplash.com/featured/?chicken,stir-fry",
      ingredientes: [
        "500g de peito de frango em cubos",
        "1 pimentão vermelho",
        "1 pimentão verde",
        "1 cebola grande",
        "2 cenouras",
        "100g de amendoim torrado",
        "Molho shoyu",
        "Óleo de gergelim",
        "Gengibre ralado",
        "3 dentes de alho"
      ],
      modoPreparo: "1. Marine o frango com shoyu e gengibre\n2. Corte os legumes em cubos\n3. Refogue o frango\n4. Adicione os legumes\n5. Finalize com amendoim e óleo de gergelim",
      informacoesNutricionais: {
        calorias: "380",
        gorduras: "16g",
        gordurasSaturadas: "3g",
        carboidratos: "12g",
        proteinas: "35g",
        fibras: "4g",
        sodio: "450mg"
      }
    },
    {
      nome: "Caril de Legumes com Leite de Coco",
      tempoPreparo: "40 minutos",
      prepTime: "PT15M",
      cookTime: "PT25M",
      totalTime: "PT40M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?curry,vegetables",
      ingredientes: [
        "2 batatas-doces médias em cubos",
        "1 couve-flor pequena em floretes",
        "2 cenouras em rodelas",
        "1 lata de grão cozido",
        "1 lata de leite de coco",
        "1 cebola picada",
        "4 dentes de alho",
        "2 colheres de caril em pó",
        "1 colher de gengibre ralado",
        "Coentros frescos",
        "Sal e pimenta q.b."
      ],
      modoPreparo: "1. Refogue a cebola e o alho em azeite\n2. Adicione o caril e o gengibre\n3. Junte os legumes e refogue por 5 minutos\n4. Adicione o leite de coco e um pouco de água\n5. Cozinhe até os legumes estarem macios\n6. Junte o grão e aqueça\n7. Finalize com coentros frescos",
      informacoesNutricionais: {
        calorias: "290",
        gorduras: "14g",
        gordurasSaturadas: "9g",
        carboidratos: "38g",
        proteinas: "8g",
        fibras: "7g",
        sodio: "320mg"
      },
      dicas: [
        "Use leite de coco gordo para um molho mais cremoso",
        "Pode substituir o grão por lentilhas",
        "Sirva com arroz basmati para uma refeição completa"
      ]
    },
    {
      nome: "Bolonhesa de Lentilhas",
      tempoPreparo: "45 minutos",
      prepTime: "PT15M",
      cookTime: "PT30M",
      totalTime: "PT45M",
      porcoes: "6 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?lentils,pasta",
      ingredientes: [
        "2 chávenas de lentilhas",
        "1 cenoura ralada",
        "2 talos de aipo picados",
        "1 cebola grande picada",
        "4 dentes de alho",
        "2 latas de tomate pelado",
        "1 colher de orégãos secos",
        "1 folha de louro",
        "Vinho tinto (opcional)",
        "Azeite",
        "Sal e pimenta q.b."
      ],
      modoPreparo: "1. Cozinhe as lentilhas até ficarem al dente\n2. Refogue cebola, alho, cenoura e aipo\n3. Adicione o tomate e temperos\n4. Junte as lentilhas e cozinhe por 20 minutos\n5. Sirva com massa à escolha",
      informacoesNutricionais: {
        calorias: "260",
        gorduras: "4g",
        gordurasSaturadas: "0.5g",
        carboidratos: "42g",
        proteinas: "15g",
        fibras: "18g",
        sodio: "280mg"
      },
      dicas: [
        "Triture parte das lentilhas para um molho mais espesso",
        "Adicione cogumelos salteados para mais sabor",
        "Pode congelar porções individuais"
      ]
    },
    {
      nome: "Hambúrguer de Feijão Preto",
      tempoPreparo: "40 minutos",
      prepTime: "PT20M",
      cookTime: "PT20M",
      totalTime: "PT40M",
      porcoes: "6 porções",
      dificuldade: "Médio",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?burger,beans",
      ingredientes: [
        "2 latas de feijão preto escorrido",
        "1 beterraba ralada",
        "1 cenoura ralada",
        "1 cebola picada",
        "3 dentes de alho",
        "1 chávena de aveia em flocos",
        "Salsa picada",
        "1 colher de cominho",
        "Sal e pimenta q.b.",
        "Azeite para grelhar"
      ],
      modoPreparo: "1. Escorra bem o feijão e esmague\n2. Misture com os legumes ralados\n3. Adicione a aveia e temperos\n4. Forme hambúrgueres\n5. Grelhe em azeite até dourar\n6. Sirva em pão com acompanhamentos",
      informacoesNutricionais: {
        calorias: "180",
        gorduras: "3g",
        gordurasSaturadas: "0.4g",
        carboidratos: "30g",
        proteinas: "9g",
        fibras: "8g",
        sodio: "240mg"
      },
      dicas: [
        "Deixe a massa descansar 30 minutos antes de formar os hambúrgueres",
        "Pode congelar antes de grelhar",
        "Sirva com guacamole para mais nutrientes"
      ]
    },
    {
      nome: "Bacalhau à Gomes de Sá",
      tempoPreparo: "60 minutos",
      prepTime: "PT20M",
      cookTime: "PT40M",
      totalTime: "PT60M",
      porcoes: "6 porções",
      dificuldade: "Médio",
      categoria: "onivoro",
      imagem: "https://source.unsplash.com/featured/?codfish",
      ingredientes: [
        "800g de bacalhau demolhado",
        "1kg de batatas",
        "4 ovos cozidos",
        "3 cebolas grandes",
        "4 dentes de alho",
        "Azeitonas pretas q.b.",
        "Salsa picada q.b.",
        "Azeite q.b.",
        "Sal e pimenta q.b."
      ],
      modoPreparo: "1. Coza o bacalhau e desfie\n2. Coza as batatas em rodelas\n3. Refogue cebola e alho em azeite\n4. Monte em camadas: batatas, bacalhau, cebola\n5. Regue com azeite\n6. Leve ao forno por 20 minutos\n7. Decore com ovos e azeitonas",
      informacoesNutricionais: {
        calorias: "420",
        gorduras: "18g",
        gordurasSaturadas: "3g",
        carboidratos: "35g",
        proteinas: "38g",
        fibras: "4g",
        sodio: "580mg"
      }
    },
    {
      nome: "Ratatouille",
      tempoPreparo: "50 minutos",
      prepTime: "PT20M",
      cookTime: "PT30M",
      totalTime: "PT50M",
      porcoes: "4 porções",
      dificuldade: "Médio",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?ratatouille",
      ingredientes: [
        "2 berinjelas",
        "3 abobrinhas",
        "2 pimentões coloridos",
        "4 tomates maduros",
        "1 cebola grande",
        "4 dentes de alho",
        "Ervas de Provence",
        "Azeite q.b.",
        "Sal e pimenta q.b."
      ],
      modoPreparo: "1. Corte os legumes em rodelas finas\n2. Prepare o molho de tomate com cebola e alho\n3. Disponha os legumes em camadas circulares\n4. Tempere com ervas e azeite\n5. Asse por 30 minutos coberto\n6. Finalize sem tampa por 10 minutos",
      informacoesNutricionais: {
        calorias: "180",
        gorduras: "8g",
        gordurasSaturadas: "1g",
        carboidratos: "24g",
        proteinas: "5g",
        fibras: "8g",
        sodio: "220mg"
      }
    },
    {
      nome: "Paella Vegetariana",
      tempoPreparo: "45 minutos",
      prepTime: "PT15M",
      cookTime: "PT30M",
      totalTime: "PT45M",
      porcoes: "6 porções",
      dificuldade: "Médio",
      categoria: "vegetariano",
      imagem: "https://source.unsplash.com/featured/?paella",
      ingredientes: [
        "2 xícaras de arroz bomba",
        "4 xícaras de caldo de legumes",
        "1 pimentão vermelho",
        "1 pimentão verde",
        "1 abobrinha",
        "200g de ervilhas",
        "Açafrão",
        "2 dentes de alho",
        "1 cebola",
        "Azeite q.b.",
        "Sal e pimenta q.b."
      ],
      modoPreparo: "1. Refogue cebola e alho\n2. Adicione os pimentões e abobrinha\n3. Junte o arroz e açafrão\n4. Adicione o caldo quente\n5. Cozinhe sem mexer\n6. Adicione as ervilhas no final",
      informacoesNutricionais: {
        calorias: "310",
        gorduras: "6g",
        gordurasSaturadas: "1g",
        carboidratos: "56g",
        proteinas: "8g",
        fibras: "6g",
        sodio: "280mg"
      }
    },
    {
      nome: "Arroz Doce",
      tempoPreparo: "40 minutos",
      prepTime: "PT10M",
      cookTime: "PT30M",
      totalTime: "PT40M",
      porcoes: "6 porções",
      dificuldade: "Fácil",
      categoria: "vegetariano",
      imagem: "https://source.unsplash.com/featured/?rice,pudding",
      ingredientes: [
        "2 chávenas de arroz",
        "1 litro de leite",
        "2 paus de canela",
        "Casca de 1 limão",
        "200g de açúcar",
        "3 gemas",
        "Canela em pó q.b."
      ],
      modoPreparo: "1. Coza o arroz com água, canela e limão\n2. Adicione o leite e deixe absorver\n3. Junte o açúcar\n4. Retire do lume e adicione as gemas\n5. Polvilhe com canela",
      informacoesNutricionais: {
        calorias: "280",
        gorduras: "5g",
        gordurasSaturadas: "2g",
        carboidratos: "52g",
        proteinas: "7g",
        fibras: "1g",
        sodio: "85mg"
      }
    },
    {
      nome: "Sopa de Abóbora",
      tempoPreparo: "35 minutos",
      prepTime: "PT10M",
      cookTime: "PT25M",
      totalTime: "PT35M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?pumpkin,soup",
      ingredientes: [
        "1 abóbora média",
        "2 cenouras",
        "1 cebola",
        "2 dentes de alho",
        "Gengibre fresco q.b.",
        "Leite de coco (opcional)",
        "Azeite",
        "Sal e pimenta q.b."
      ],
      modoPreparo: "1. Corte os legumes em cubos\n2. Refogue cebola e alho\n3. Adicione abóbora e cenoura\n4. Cubra com água e cozinhe\n5. Triture tudo\n6. Finalize com leite de coco",
      informacoesNutricionais: {
        calorias: "160",
        gorduras: "7g",
        gordurasSaturadas: "3g",
        carboidratos: "22g",
        proteinas: "3g",
        fibras: "4g",
        sodio: "180mg"
      }
    },
    {
      nome: "Francesinha Vegetariana",
      tempoPreparo: "45 minutos",
      prepTime: "PT15M",
      cookTime: "PT30M",
      totalTime: "PT45M",
      porcoes: "2 porções",
      dificuldade: "Médio",
      categoria: "vegetariano",
      imagem: "https://source.unsplash.com/featured/?sandwich",
      ingredientes: [
        "4 fatias de pão de forma",
        "2 hambúrgueres vegetais",
        "4 fatias de queijo",
        "Molho de tomate picante",
        "200ml de cerveja",
        "1 cebola",
        "2 dentes de alho",
        "Mostarda",
        "Batatas fritas para acompanhar"
      ],
      modoPreparo: "1. Prepare o molho com cerveja e tomate\n2. Grelhe os hambúrgueres\n3. Monte o sanduíche em camadas\n4. Cubra com queijo\n5. Regue com o molho quente",
      informacoesNutricionais: {
        calorias: "580",
        gorduras: "28g",
        gordurasSaturadas: "12g",
        carboidratos: "62g",
        proteinas: "22g",
        fibras: "4g",
        sodio: "980mg"
      }
    },
    {
      nome: "Moqueca de Banana da Terra",
      tempoPreparo: "40 minutos",
      prepTime: "PT15M",
      cookTime: "PT25M",
      totalTime: "PT40M",
      porcoes: "4 porções",
      dificuldade: "Fácil",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?plantain,stew",
      ingredientes: [
        "4 bananas da terra maduras",
        "2 tomates maduros",
        "1 pimentão vermelho",
        "1 cebola grande",
        "400ml de leite de coco",
        "2 dentes de alho",
        "Coentro fresco",
        "Azeite de dendê",
        "Sal e pimenta q.b."
      ],
      modoPreparo: "1. Corte as bananas em rodelas grossas\n2. Refogue cebola e alho\n3. Adicione tomate e pimentão\n4. Junte o leite de coco\n5. Acrescente as bananas\n6. Cozinhe por 15 minutos\n7. Finalize com dendê e coentro",
      informacoesNutricionais: {
        calorias: "280",
        gorduras: "14g",
        gordurasSaturadas: "8g",
        carboidratos: "38g",
        proteinas: "4g",
        fibras: "5g",
        sodio: "180mg"
      }
    },
    {
      nome: "Feijoada Vegana",
      tempoPreparo: "90 minutos",
      prepTime: "PT30M",
      cookTime: "PT60M",
      totalTime: "PT90M",
      porcoes: "6 porções",
      dificuldade: "Médio",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?beans,stew",
      ingredientes: [
        "500g de feijão preto",
        "200g de proteína de soja texturizada",
        "2 cenouras em cubos",
        "2 batatas em cubos",
        "1 cebola grande",
        "4 dentes de alho",
        "2 folhas de louro",
        "Azeite",
        "Sal e pimenta q.b.",
        "Couve para acompanhar",
        "Farofa vegana",
        "Laranja"
      ],
      modoPreparo: "1. Deixe o feijão de molho\n2. Hidrate a proteína de soja\n3. Refogue cebola e alho\n4. Cozinhe o feijão com louro\n5. Adicione os legumes\n6. Junte a proteína de soja\n7. Cozinhe até todos os ingredientes estarem macios",
      informacoesNutricionais: {
        calorias: "320",
        gorduras: "6g",
        gordurasSaturadas: "0.8g",
        carboidratos: "48g",
        proteinas: "22g",
        fibras: "12g",
        sodio: "280mg"
      }
    },
    {
      nome: "Torta de Maçã Vegana",
      tempoPreparo: "60 minutos",
      prepTime: "PT20M",
      cookTime: "PT40M",
      totalTime: "PT60M",
      porcoes: "8 porções",
      dificuldade: "Médio",
      categoria: "vegano",
      imagem: "https://source.unsplash.com/featured/?apple,pie",
      ingredientes: [
        "3 maçãs grandes",
        "200g de farinha integral",
        "100g de açúcar mascavo",
        "100ml de óleo de coco",
        "60ml de água gelada",
        "1 colher de canela",
        "Suco de 1/2 limão",
        "Pitada de sal"
      ],
      modoPreparo: "1. Prepare a massa com farinha, óleo e água\n2. Corte as maçãs em fatias finas\n3. Tempere com limão, açúcar e canela\n4. Forre uma forma com a massa\n5. Disponha as maçãs\n6. Asse por 40 minutos",
      informacoesNutricionais: {
        calorias: "260",
        gorduras: "12g",
        gordurasSaturadas: "8g",
        carboidratos: "36g",
        proteinas: "3g",
        fibras: "4g",
        sodio: "120mg"
      }
    }
  ]

  return {
    props: {
      receitas
    },
    revalidate: 86400
  }
} 