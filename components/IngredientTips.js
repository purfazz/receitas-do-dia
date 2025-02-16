import { useState, useEffect } from 'react'
import { Box, Text, Spinner, VStack, Button, useColorModeValue, Heading, List, ListItem, ListIcon, HStack, IconButton } from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'

// A chave API deve vir de uma variável de ambiente
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

export default function IngredientTips({ ingredient, onClose }) {
  const [loading, setLoading] = useState(true)
  const [tips, setTips] = useState(null)
  const [error, setError] = useState(null)
  const bgColor = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    async function getIngredientTips() {
      try {
        // Verifica se temos uma chave API configurada
        if (!GEMINI_API_KEY) {
          throw new Error('API temporariamente indisponível')
        }

        console.log('Iniciando chamada para API Gemini...')
        
        const prompt = `Analise o seguinte ingrediente da culinária: ${ingredient}.
          Forneça dicas específicas em português, seguindo EXATAMENTE este formato:

          Como Escolher:
          - [dica específica de como escolher]
          - [outra dica específica de como escolher]

          Como Armazenar:
          - [dica específica de armazenamento]
          - [outra dica específica de armazenamento]

          Como Preparar:
          - [dica específica de preparo]
          - [outra dica específica de preparo]

          Benefícios para a Saúde:
          - [benefício específico para a saúde]
          - [outro benefício específico para a saúde]

          Combinações:
          - [combinação específica com outros ingredientes]
          - [outra combinação específica]

          Mantenha cada dica curta e direta, com informações práticas e úteis.
          NÃO use asteriscos ou formatação especial.
          NÃO repita os títulos das seções nas dicas.
          NÃO use pontos numerados, apenas hífens.`

        const requestBody = {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }

        console.log('Enviando requisição para Gemini...')
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          }
        )

        if (!response.ok) {
          throw new Error('Serviço temporariamente indisponível')
        }

        const data = await response.json()
        
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new Error('Não foi possível gerar as dicas no momento')
        }

        const tipsText = data.candidates[0].content.parts[0].text
        
        // Organiza as dicas em categorias
        const categories = {
          escolha: [],
          armazenamento: [],
          preparo: [],
          beneficios: [],
          combinacoes: []
        }

        const lines = tipsText.split('\n').filter(line => line.trim())
        let currentCategory = null
        
        lines.forEach(line => {
          // Remove espaços extras e formatação
          const cleanLine = line.replace(/\*\*/g, '').trim()
          
          // Verifica se é uma linha de título de categoria
          if (cleanLine.toLowerCase().includes('como escolher:')) {
            currentCategory = 'escolha'
          } else if (cleanLine.toLowerCase().includes('como armazenar:')) {
            currentCategory = 'armazenamento'
          } else if (cleanLine.toLowerCase().includes('como preparar:')) {
            currentCategory = 'preparo'
          } else if (cleanLine.toLowerCase().includes('benefícios')) {
            currentCategory = 'beneficios'
          } else if (cleanLine.toLowerCase().includes('combinações:')) {
            currentCategory = 'combinacoes'
          } else if (cleanLine.startsWith('-')) {
            // Se é uma linha de dica (começa com hífen)
            const tipContent = cleanLine.replace(/^-\s*/, '').trim()
            if (currentCategory && tipContent) {
              categories[currentCategory].push(tipContent)
            }
          }
        })

        setTips(categories)
      } catch (err) {
        console.error('Erro ao buscar dicas:', err)
        setError('Desculpe, o serviço de dicas está temporariamente indisponível. Por favor, tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    if (ingredient) {
      getIngredientTips()
    }
  }, [ingredient])

  if (loading) {
    return (
      <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="xl" textAlign="center">
        <Spinner size="xl" color="orange.500" thickness="4px" />
        <Text mt={4} fontSize="lg">Consultando o Chef...</Text>
        <Text fontSize="sm" color="gray.500" mt={2}>Buscando dicas sobre {ingredient}</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={6} bg={bgColor} borderRadius="lg" boxShadow="xl" textAlign="center">
        <Text color="red.500" fontSize="lg" mb={4}>{error}</Text>
        <Button colorScheme="orange" onClick={onClose}>
          Fechar
        </Button>
      </Box>
    )
  }

  return (
    <Box maxH="80vh" overflowY="auto" p={6} bg={bgColor} borderRadius="xl" boxShadow="xl">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" mb={2}>
          <Heading size="lg" color="teal.500">
            Dicas do Chef: {ingredient}
          </Heading>
          <IconButton
            icon={<CloseIcon />}
            onClick={onClose}
            variant="ghost"
            aria-label="Fechar dicas"
          />
        </HStack>

        {/* Como Escolher */}
        {tips && tips.escolha.length > 0 && (
          <Box>
            <Heading size="md" color="orange.400" mb={2}>
              🔍 Como Escolher
            </Heading>
            <List spacing={2}>
              {tips.escolha.slice(0, 2).map((tip, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={CheckIcon} color="green.500" />
                  <Text>{tip}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Como Armazenar */}
        {tips && tips.armazenamento.length > 0 && (
          <Box>
            <Heading size="md" color="orange.400" mb={2}>
              📦 Como Armazenar
            </Heading>
            <List spacing={2}>
              {tips.armazenamento.slice(0, 2).map((tip, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={CheckIcon} color="green.500" />
                  <Text>{tip}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Como Preparar */}
        {tips && tips.preparo.length > 0 && (
          <Box>
            <Heading size="md" color="orange.400" mb={2}>
              👩‍🍳 Como Preparar
            </Heading>
            <List spacing={2}>
              {tips.preparo.slice(0, 2).map((tip, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={CheckIcon} color="green.500" />
                  <Text>{tip}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Benefícios */}
        {tips && tips.beneficios.length > 0 && (
          <Box>
            <Heading size="md" color="orange.400" mb={2}>
              💪 Benefícios para a Saúde
            </Heading>
            <List spacing={2}>
              {tips.beneficios.slice(0, 2).map((tip, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={CheckIcon} color="green.500" />
                  <Text>{tip}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Combinações */}
        {tips && tips.combinacoes.length > 0 && (
          <Box>
            <Heading size="md" color="orange.400" mb={2}>
              🔄 Combinações
            </Heading>
            <List spacing={2}>
              {tips.combinacoes.slice(0, 2).map((tip, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={CheckIcon} color="green.500" />
                  <Text>{tip}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </VStack>
    </Box>
  )
} 