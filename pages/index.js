import Head from 'next/head'
import { Box, Button, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import AdComponent from '../components/AdComponent'
import CTASection from '../components/CTASection'

export default function Home({ receitas }) {
  const [receitaDoDia, setReceitaDoDia] = useState(null)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')

  const escolherReceita = () => {
    let novaReceita;
    do {
      novaReceita = receitas[Math.floor(Math.random() * receitas.length)]
    } while (receitaDoDia && novaReceita.nome === receitaDoDia.nome && receitas.length > 1)
    
    setReceitaDoDia(novaReceita)
  }

  return (
    <>
      <Head>
        <title>Receita do Dia - Descubra Receitas Deliciosas</title>
        <meta name="description" content="Descubra uma nova receita deliciosa todos os dias! Receitas simples e saborosas para seu dia a dia." />
        <meta name="keywords" content="receita do dia, receitas fáceis, culinária, receitas simples, receitas rápidas" />
        <meta property="og:title" content="Receita do Dia - Descubra Receitas Deliciosas" />
        <meta property="og:description" content="Descubra uma nova receita deliciosa todos os dias! Receitas simples e saborosas para seu dia a dia." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seu-dominio.com/og-image.jpg" />
        <meta property="og:url" content="https://seu-dominio.com" />
        <meta property="og:site_name" content="Receita do Dia" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Receita do Dia - Descubra Receitas Deliciosas" />
        <meta name="twitter:description" content="Descubra uma nova receita deliciosa todos os dias! Receitas simples e saborosas para seu dia a dia." />
        <meta name="twitter:image" content="https://seu-dominio.com/twitter-card.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Schema.org para Rich Snippets */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Receita do Dia",
              "description": "Descubra receitas deliciosas diariamente",
              "url": "https://seu-dominio.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://seu-dominio.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": "Receitas Diárias",
              "description": "Descubra receitas deliciosas todos os dias",
              "keywords": "receitas, culinária, receitas fáceis, receitas rápidas",
              "author": {
                "@type": "Organization",
                "name": "Receita do Dia"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "100"
              }
            }
          `}
        </script>
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
      porcoes: "4 porções",
      dificuldade: "Fácil",
      imagem: "https://loremflickr.com/800/600/chicken,vegetables",
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
    {
      nome: "Risoto de Cogumelos",
      tempoPreparo: "45 minutos",
      porcoes: "6 porções",
      dificuldade: "Médio",
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
      porcoes: "8 porções",
      dificuldade: "Fácil",
      imagem: "https://loremflickr.com/800/600/chocolate,cake",
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
      modoPreparo: "1. Pré-aqueça o forno a 180°C\n2. Unte uma forma redonda com óleo e cacau\n3. Em uma tigela, misture todos os ingredientes secos\n4. Em outra tigela, misture todos os ingredientes líquidos\n5. Combine as misturas até formar uma massa homogênea\n6. Despeje na forma preparada\n7. Asse por 35-40 minutos ou até um palito sair limpo\n8. Deixe esfriar antes de desenformar\n9. Decore com ganache vegano se desejar"
    },
    {
      nome: "Salmão ao Molho de Limão",
      tempoPreparo: "25 minutos",
      porcoes: "2 porções",
      dificuldade: "Médio",
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
      porcoes: "6 porções",
      dificuldade: "Médio",
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
      porcoes: "10 porções",
      dificuldade: "Difícil",
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
      porcoes: "4 porções",
      dificuldade: "Médio",
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
      porcoes: "4 porções",
      dificuldade: "Médio",
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
    }
  ]

  return {
    props: {
      receitas
    },
    revalidate: 86400
  }
} 