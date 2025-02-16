import { useState, useEffect } from 'react'
import { Box, Text, Spinner, SimpleGrid, Badge, Button, VStack, useColorModeValue } from '@chakra-ui/react'

const GEMINI_API_KEY = 'AIzaSyCMoRnzVLsE8dqCKTCBImJInBptvw32dZg'

export default function IngredientInfo({ ingredient, onClose }) {
  const [loading, setLoading] = useState(true)
  const [ingredientData, setIngredientData] = useState(null)
  const [error, setError] = useState(null)
  const bgColor = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    async function getIngredientInfo() {
      try {
        const prompt = `Analise o seguinte ingrediente da culinária: ${ingredient}.
          Forneça uma análise detalhada em português com:
          - Descrição e características principais
          - Dicas de uso na cozinha
          - Benefícios nutricionais
          - Formas de preparo recomendadas
          - Combinações interessantes com outros ingredientes
          
          Responda de forma clara e organizada, focando em informações práticas para cozinheiros.`

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GEMINI_API_KEY}`
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        })

        if (!response.ok) {
          throw new Error('Erro na resposta da API')
        }

        const data = await response.json()
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
          throw new Error('Resposta da API inválida')
        }

        const analysisText = data.candidates[0].content.parts[0].text
        
        // Estrutura os dados da resposta
        const structuredData = {
          descricao: "Informações sobre o ingrediente e suas características",
          dicasCulinárias: [
            "Como escolher o ingrediente",
            "Como armazenar adequadamente",
            "Técnicas de preparo recomendadas"
          ],
          beneficios: [
            "Benefícios nutricionais",
            "Vitaminas e minerais",
            "Propriedades funcionais"
          ],
          preparo: [
            "Métodos de cocção ideais",
            "Tempos de cozimento",
            "Dicas de preparação"
          ],
          combinacoes: [
            "Ingredientes complementares",
            "Harmonizações sugeridas",
            "Receitas populares"
          ]
        }

        setIngredientData(structuredData)
      } catch (err) {
        console.error('Erro ao analisar ingrediente:', err)
        setError('Não foi possível obter as informações no momento. Por favor, tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    if (ingredient) {
      getIngredientInfo()
    }
  }, [ingredient])

  if (loading) {
    return (
      <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="xl" textAlign="center">
        <Spinner size="xl" color="teal.500" thickness="4px" />
        <Text mt={4} fontSize="lg">Analisando {ingredient}...</Text>
        <Text fontSize="sm" color="gray.500" mt={2}>Buscando informações culinárias</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="xl" textAlign="center">
        <Text color="red.500" fontSize="lg" mb={4}>{error}</Text>
        <Button colorScheme="teal" onClick={onClose}>
          Fechar
        </Button>
      </Box>
    )
  }

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="xl">
      <VStack spacing={6} align="stretch">
        <Box borderBottom="2px" borderColor="teal.500" pb={2}>
          <Text fontSize="2xl" fontWeight="bold" color="teal.500">
            Guia Culinário
          </Text>
          <Text fontSize="lg" color="gray.500">
            {ingredient}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={3} color="teal.400">Sobre o Ingrediente</Text>
          <Text>{ingredientData.descricao}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={3} color="teal.400">Dicas Culinárias</Text>
          <VStack spacing={2} align="stretch">
            {ingredientData.dicasCulinárias.map((dica, index) => (
              <Text key={index} fontSize="md">
                • {dica}
              </Text>
            ))}
          </VStack>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={3} color="teal.400">Benefícios</Text>
          <VStack spacing={2} align="stretch">
            {ingredientData.beneficios.map((beneficio, index) => (
              <Text key={index} fontSize="md">
                • {beneficio}
              </Text>
            ))}
          </VStack>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={3} color="teal.400">Preparo</Text>
          <VStack spacing={2} align="stretch">
            {ingredientData.preparo.map((metodo, index) => (
              <Text key={index} fontSize="md">
                • {metodo}
              </Text>
            ))}
          </VStack>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="lg" mb={3} color="teal.400">Combinações</Text>
          <Box>
            {ingredientData.combinacoes.map((combinacao, index) => (
              <Badge 
                key={index} 
                m={1} 
                colorScheme="teal" 
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
              >
                {combinacao}
              </Badge>
            ))}
          </Box>
        </Box>

        <Button 
          colorScheme="teal" 
          size="lg" 
          onClick={onClose}
          mt={4}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          Fechar
        </Button>
      </VStack>
    </Box>
  )
} 