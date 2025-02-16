import { useState } from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  List,
  ListItem,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  useColorModeValue,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { MdSchool, MdRestaurant, MdEventNote } from 'react-icons/md'

// A chave API deve vir de uma variável de ambiente
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

export default function LearningResources() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue('gray.50', 'gray.700')

  const topics = {
    basico: {
      title: "Guias Básicos",
      icon: MdSchool,
      items: [
        "Técnicas de corte",
        "Medidas e conversões",
        "Utensílios essenciais"
      ]
    },
    avancado: {
      title: "Dicas Avançadas",
      icon: MdRestaurant,
      items: [
        "Harmonização",
        "Apresentação de pratos",
        "Técnicas profissionais"
      ]
    },
    planejamento: {
      title: "Planejamento",
      icon: MdEventNote,
      items: [
        "Meal prep",
        "Lista de compras",
        "Organização da cozinha"
      ]
    }
  }

  const handleTopicClick = async (category, topic) => {
    setSelectedTopic(topic)
    setLoading(true)
    onOpen()

    try {
      const prompt = `Forneça informações detalhadas em português sobre ${topic} na culinária.
        Organize a resposta nos seguintes tópicos:

        O Que É:
        - [breve explicação do conceito]
        - [importância na culinária]

        Conceitos Fundamentais:
        - [primeiro conceito importante]
        - [segundo conceito importante]
        - [terceiro conceito importante]

        Dicas Para Praticar:
        - [primeira dica prática]
        - [segunda dica prática]
        - [terceira dica prática]

        Exemplos Práticos:
        - [primeiro exemplo]
        - [segundo exemplo]
        - [terceiro exemplo]

        Mantenha cada item curto e direto, com informações práticas e úteis.
        NÃO use asteriscos ou formatação especial.
        NÃO repita os títulos das seções nas dicas.
        NÃO use pontos numerados, apenas hífens.`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      )

      if (!response.ok) {
        throw new Error('Falha ao carregar o conteúdo')
      }

      const data = await response.json()
      const content = data.candidates[0].content.parts[0].text
      setContent(content)
    } catch (error) {
      console.error('Erro ao buscar conteúdo:', error)
      setContent('Desculpe, não foi possível carregar o conteúdo no momento. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {Object.entries(topics).map(([key, category]) => (
          <Box key={key} p={4} bg={bgColor} borderRadius="md">
            <VStack align="start" spacing={3}>
              <Heading size="md" display="flex" alignItems="center">
                <Icon as={category.icon} mr={2} />
                {category.title}
              </Heading>
              <List spacing={2} width="100%">
                {category.items.map((item) => (
                  <ListItem key={item}>
                    <Button
                      variant="ghost"
                      size="sm"
                      width="100%"
                      justifyContent="flex-start"
                      onClick={() => handleTopicClick(key, item)}
                      leftIcon={<Icon as={MdSchool} />}
                    >
                      {item}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader 
            display="flex" 
            alignItems="center" 
            bg="teal.500" 
            color="white" 
            borderTopRadius="md"
          >
            <Icon as={MdSchool} mr={2} />
            {selectedTopic}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            {loading ? (
              <VStack spacing={4} align="center" py={8}>
                <Text>Preparando o conteúdo educativo...</Text>
                <Text fontSize="sm" color="gray.500">Organizando as informações para você</Text>
              </VStack>
            ) : (
              <Accordion allowMultiple defaultIndex={[0]} pt={4}>
                {/* O Que É */}
                <AccordionItem border="none" mb={2}>
                  <AccordionButton
                    bg="teal.500"
                    color="white"
                    _hover={{ bg: 'teal.600' }}
                    borderRadius="md"
                  >
                    <Box flex="1" textAlign="left" display="flex" alignItems="center">
                      <Icon as={MdSchool} mr={2} />
                      <Text fontWeight="bold">O Que É</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={2}>
                      {content?.split('\n').filter(line => 
                        line.includes('O Que É:') ? false :
                        line.includes('Conceitos Fundamentais:') ? false :
                        line.includes('Dicas Para Praticar:') ? false :
                        line.includes('Exemplos Práticos:') ? false :
                        line.startsWith('-') && !line.includes(':')
                      ).map((line, index) => (
                        <ListItem 
                          key={index} 
                          display="flex" 
                          alignItems="center"
                          bg="gray.50"
                          p={2}
                          borderRadius="md"
                          _dark={{ bg: 'gray.700' }}
                        >
                          <Icon as={MdSchool} color="teal.500" mr={2} />
                          <Text>{line.replace(/^-\s*/, '')}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>

                {/* Conceitos Fundamentais */}
                <AccordionItem border="none" mb={2}>
                  <AccordionButton
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: 'blue.600' }}
                    borderRadius="md"
                  >
                    <Box flex="1" textAlign="left" display="flex" alignItems="center">
                      <Icon as={MdRestaurant} mr={2} />
                      <Text fontWeight="bold">Conceitos Fundamentais</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={2}>
                      {content?.split('\n').filter(line =>
                        line.includes('Conceitos Fundamentais:') ? false :
                        line.includes('Dicas Para Praticar:') ? false :
                        line.includes('Exemplos Práticos:') ? false :
                        line.startsWith('-')
                      ).map((line, index) => (
                        <ListItem 
                          key={index} 
                          display="flex" 
                          alignItems="center"
                          bg="blue.50"
                          p={2}
                          borderRadius="md"
                          _dark={{ bg: 'blue.900' }}
                        >
                          <Icon as={MdRestaurant} color="blue.500" mr={2} />
                          <Text>{line.replace(/^-\s*/, '')}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>

                {/* Dicas Para Praticar */}
                <AccordionItem border="none" mb={2}>
                  <AccordionButton
                    bg="orange.500"
                    color="white"
                    _hover={{ bg: 'orange.600' }}
                    borderRadius="md"
                  >
                    <Box flex="1" textAlign="left" display="flex" alignItems="center">
                      <Icon as={MdEventNote} mr={2} />
                      <Text fontWeight="bold">Dicas Para Praticar</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={2}>
                      {content?.split('\n').filter(line =>
                        line.includes('Dicas Para Praticar:') ? false :
                        line.includes('Exemplos Práticos:') ? false :
                        line.startsWith('-')
                      ).map((line, index) => (
                        <ListItem 
                          key={index} 
                          display="flex" 
                          alignItems="center"
                          bg="orange.50"
                          p={2}
                          borderRadius="md"
                          _dark={{ bg: 'orange.900' }}
                        >
                          <Icon as={MdEventNote} color="orange.500" mr={2} />
                          <Text>{line.replace(/^-\s*/, '')}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>

                {/* Exemplos Práticos */}
                <AccordionItem border="none">
                  <AccordionButton
                    bg="green.500"
                    color="white"
                    _hover={{ bg: 'green.600' }}
                    borderRadius="md"
                  >
                    <Box flex="1" textAlign="left" display="flex" alignItems="center">
                      <Icon as={MdSchool} mr={2} />
                      <Text fontWeight="bold">Exemplos Práticos</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <List spacing={2}>
                      {content?.split('\n').filter(line =>
                        line.includes('Exemplos Práticos:') ? false :
                        line.startsWith('-')
                      ).map((line, index) => (
                        <ListItem 
                          key={index} 
                          display="flex" 
                          alignItems="center"
                          bg="green.50"
                          p={2}
                          borderRadius="md"
                          _dark={{ bg: 'green.900' }}
                        >
                          <Icon as={MdSchool} color="green.500" mr={2} />
                          <Text>{line.replace(/^-\s*/, '')}</Text>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
} 