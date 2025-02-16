import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  useColorModeValue,
  Spinner,
  Divider,
  List,
  ListItem,
  ListIcon,
  HStack,
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
  Button
} from '@chakra-ui/react'
import { MdCheckCircle, MdHistory, MdScience, MdTipsAndUpdates, MdBuild, MdSummarize } from 'react-icons/md'
import { FaBookOpen, FaHistory, FaCogs, FaLightbulb, FaTools, FaFlag } from 'react-icons/fa'

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const cardBg = useColorModeValue('white', 'gray.800')
  const sectionBg = useColorModeValue('gray.50', 'gray.700')
  const iconColor = useColorModeValue('teal.500', 'teal.200')
  const [selectedSection, setSelectedSection] = useState('introducao')

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    
    // Função para gerar datas recentes
    const generateRecentDates = () => {
      const today = new Date()
      const dates = []
      for (let i = 0; i < 40; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        dates.push(date.toISOString().split('T')[0])
      }
      return dates
    }

    const recentDates = generateRecentDates()

    // Encontra o post correspondente ao slug
    const posts = [
      // Técnicas Culinárias
      {
        titulo: "A Ciência por Trás do Fermento na Panificação",
        slug: "a-ciencia-por-tras-do-fermento-na-panificacao",
        resumo: "Entenda os processos químicos e biológicos que fazem o pão crescer e como isso afeta o resultado final.",
        imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Técnicas Culinárias",
        data: recentDates[0],
        tempoLeitura: "8 min"
      },
      {
        titulo: "Fermentação Natural: Guia para Iniciantes",
        slug: "fermentacao-natural-guia-para-iniciantes",
        resumo: "Descubra o mundo dos alimentos fermentados e como fazer seu próprio fermento natural.",
        imagem: "https://images.unsplash.com/photo-1600626333392-6ab0a181829d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Técnicas Culinárias",
        data: recentDates[1],
        tempoLeitura: "9 min"
      },
      {
        titulo: "Técnicas de Corte Profissional",
        slug: "tecnicas-de-corte-profissional",
        resumo: "Aprenda as técnicas básicas e avançadas de corte usadas por chefs profissionais.",
        imagem: "https://images.unsplash.com/photo-1595436252086-7496fb8c41e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Técnicas Culinárias",
        data: recentDates[2],
        tempoLeitura: "10 min"
      },
      {
        titulo: "Sous Vide: Cozimento de Precisão",
        slug: "sous-vide-cozimento-de-precisao",
        resumo: "Domine a técnica de cozimento a vácuo usada em restaurantes estrelados.",
        imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Técnicas Culinárias",
        data: recentDates[15],
        tempoLeitura: "11 min"
      },
      {
        titulo: "A Arte do Tempero",
        slug: "a-arte-do-tempero",
        resumo: "Aprenda a equilibrar sabores e criar combinações perfeitas de temperos.",
        imagem: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Técnicas Culinárias",
        data: recentDates[16],
        tempoLeitura: "8 min"
      },
      {
        titulo: "Defumação Caseira",
        slug: "defumacao-caseira",
        resumo: "Aprenda a defumar alimentos em casa com equipamentos simples.",
        imagem: "https://source.unsplash.com/featured/?smoking,food",
        categoria: "Técnicas Culinárias",
        data: recentDates[25],
        tempoLeitura: "13 min"
      },
      {
        titulo: "Confeitaria Básica",
        slug: "confeitaria-basica",
        resumo: "Domine as técnicas fundamentais de confeitaria.",
        imagem: "https://source.unsplash.com/featured/?pastry,baking",
        categoria: "Técnicas Culinárias",
        data: recentDates[26],
        tempoLeitura: "14 min"
      },
      // Nutrição
      {
        titulo: "Proteínas Vegetais: Guia Completo",
        slug: "proteinas-vegetais-guia-completo",
        resumo: "Descubra as melhores fontes de proteína vegetal e como incorporá-las em suas refeições diárias.",
        imagem: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Nutrição",
        data: recentDates[3],
        tempoLeitura: "10 min"
      },
      {
        titulo: "Alimentação Funcional na Prática",
        slug: "alimentacao-funcional-na-pratica",
        resumo: "Como incorporar alimentos funcionais na sua dieta diária de forma prática e saborosa.",
        imagem: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Nutrição",
        data: recentDates[4],
        tempoLeitura: "12 min"
      },
      {
        titulo: "Guia de Vitaminas e Minerais",
        slug: "guia-de-vitaminas-e-minerais",
        resumo: "Entenda a importância de cada nutriente e onde encontrá-los naturalmente.",
        imagem: "https://source.unsplash.com/featured/?vitamins,minerals",
        categoria: "Nutrição",
        data: recentDates[5],
        tempoLeitura: "15 min"
      },
      {
        titulo: "Alimentação Anti-inflamatória",
        slug: "alimentacao-antiinflamatoria",
        resumo: "Descubra os alimentos que ajudam a combater a inflamação no corpo e melhore sua saúde através da alimentação.",
        imagem: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        categoria: "Nutrição",
        data: recentDates[17],
        tempoLeitura: "13 min"
      },
      {
        titulo: "Probióticos Naturais",
        slug: "probioticos-naturais",
        resumo: "Como incluir alimentos probióticos na sua dieta diária.",
        imagem: "https://source.unsplash.com/featured/?probiotic,food",
        categoria: "Nutrição",
        data: recentDates[18],
        tempoLeitura: "10 min"
      },
      {
        titulo: "Superalimentos no Dia a Dia",
        slug: "superalimentos-no-dia-a-dia",
        resumo: "Como incorporar superalimentos em suas refeições diárias.",
        imagem: "https://source.unsplash.com/featured/?superfoods",
        categoria: "Nutrição",
        data: recentDates[27],
        tempoLeitura: "9 min"
      },
      {
        titulo: "Nutrição para Atletas",
        slug: "nutricao-para-atletas",
        resumo: "Guia nutricional para melhorar o desempenho esportivo.",
        imagem: "https://source.unsplash.com/featured/?sports,nutrition",
        categoria: "Nutrição",
        data: recentDates[28],
        tempoLeitura: "12 min"
      },
      // Cozinhas do Mundo
      {
        titulo: "Explorando a Culinária Tailandesa",
        slug: "explorando-a-culinaria-tailandesa",
        resumo: "Uma jornada pelos sabores, ingredientes e técnicas tradicionais da Tailândia.",
        imagem: "https://source.unsplash.com/featured/?thai,food",
        categoria: "Cozinhas do Mundo",
        data: recentDates[6],
        tempoLeitura: "12 min"
      },
      {
        titulo: "Segredos da Cozinha Italiana",
        slug: "segredos-da-cozinha-italiana",
        resumo: "Descubra as técnicas e ingredientes autênticos da culinária italiana.",
        imagem: "https://source.unsplash.com/featured/?italian,food",
        categoria: "Cozinhas do Mundo",
        data: recentDates[7],
        tempoLeitura: "14 min"
      },
      {
        titulo: "Sabores do Oriente Médio",
        slug: "sabores-do-oriente-medio",
        resumo: "Explore os temperos e pratos tradicionais da culinária árabe.",
        imagem: "https://source.unsplash.com/featured/?middleeastern,food",
        categoria: "Cozinhas do Mundo",
        data: recentDates[8],
        tempoLeitura: "11 min"
      },
      {
        titulo: "Gastronomia Japonesa Tradicional",
        slug: "gastronomia-japonesa-tradicional",
        resumo: "Explore as técnicas e filosofia da culinária japonesa.",
        imagem: "https://source.unsplash.com/featured/?japanese,food",
        categoria: "Cozinhas do Mundo",
        data: recentDates[19],
        tempoLeitura: "14 min"
      },
      {
        titulo: "Sabores da Culinária Peruana",
        slug: "sabores-da-culinaria-peruana",
        resumo: "Descubra os segredos da gastronomia peruana moderna.",
        imagem: "https://source.unsplash.com/featured/?peruvian,food",
        categoria: "Cozinhas do Mundo",
        data: recentDates[20],
        tempoLeitura: "12 min"
      },
      {
        titulo: "Culinária Indiana Autêntica",
        slug: "culinaria-indiana-autentica",
        resumo: "Descubra os segredos dos curry e masalas indianos.",
        imagem: "https://source.unsplash.com/featured/?indian,food",
        categoria: "Cozinhas do Mundo",
        data: recentDates[29],
        tempoLeitura: "15 min"
      },
      {
        titulo: "Cozinha Mediterrânea",
        slug: "cozinha-mediterranea",
        resumo: "Explore os sabores saudáveis da dieta mediterrânea.",
        imagem: "https://source.unsplash.com/featured/?mediterranean,food",
        categoria: "Cozinhas do Mundo",
        data: recentDates[30],
        tempoLeitura: "11 min"
      },
      // Sustentabilidade
      {
        titulo: "Aproveitamento Integral dos Alimentos",
        slug: "aproveitamento-integral-dos-alimentos",
        resumo: "Aprenda a utilizar cascas, talos e sementes, reduzindo o desperdício e aumentando o valor nutricional.",
        imagem: "https://source.unsplash.com/featured/?sustainable,food",
        categoria: "Sustentabilidade",
        data: recentDates[9],
        tempoLeitura: "7 min"
      },
      {
        titulo: "Horta Urbana: Guia Completo",
        slug: "horta-urbana-guia-completo",
        resumo: "Como criar e manter uma horta em casa, mesmo com pouco espaço.",
        imagem: "https://source.unsplash.com/featured/?urban,garden",
        categoria: "Sustentabilidade",
        data: recentDates[10],
        tempoLeitura: "13 min"
      },
      {
        titulo: "Compostagem Doméstica",
        slug: "compostagem-domestica",
        resumo: "Transforme resíduos orgânicos em adubo rico em nutrientes.",
        imagem: "https://source.unsplash.com/featured/?compost,organic",
        categoria: "Sustentabilidade",
        data: recentDates[11],
        tempoLeitura: "9 min"
      },
      {
        titulo: "Embalagens Sustentáveis",
        slug: "embalagens-sustentaveis",
        resumo: "Alternativas ecológicas para armazenar alimentos.",
        imagem: "https://source.unsplash.com/featured/?sustainable,packaging",
        categoria: "Sustentabilidade",
        data: recentDates[21],
        tempoLeitura: "8 min"
      },
      {
        titulo: "Pesca Sustentável",
        slug: "pesca-sustentavel",
        resumo: "Guia para consumo consciente de pescados.",
        imagem: "https://source.unsplash.com/featured/?sustainable,fishing",
        categoria: "Sustentabilidade",
        data: recentDates[22],
        tempoLeitura: "11 min"
      },
      {
        titulo: "Agricultura Urbana",
        slug: "agricultura-urbana",
        resumo: "Como criar uma horta produtiva em pequenos espaços.",
        imagem: "https://source.unsplash.com/featured/?urban,farming",
        categoria: "Sustentabilidade",
        data: recentDates[31],
        tempoLeitura: "10 min"
      },
      {
        titulo: "Cozinha Zero Desperdício",
        slug: "cozinha-zero-desperdicio",
        resumo: "Dicas práticas para aproveitar 100% dos alimentos.",
        imagem: "https://source.unsplash.com/featured/?zerowaste,food",
        categoria: "Sustentabilidade",
        data: recentDates[32],
        tempoLeitura: "8 min"
      },
      // Histórias da Gastronomia
      {
        titulo: "A História do Chocolate",
        slug: "a-historia-do-chocolate",
        resumo: "Das civilizações antigas aos dias atuais: a fascinante jornada do chocolate através dos tempos.",
        imagem: "https://source.unsplash.com/featured/?chocolate,cocoa",
        categoria: "Histórias da Gastronomia",
        data: recentDates[12],
        tempoLeitura: "15 min"
      },
      {
        titulo: "Origem das Especiarias",
        slug: "origem-das-especiarias",
        resumo: "A fascinante história das rotas das especiarias e seu impacto na gastronomia mundial.",
        imagem: "https://source.unsplash.com/featured/?spices,herbs",
        categoria: "Histórias da Gastronomia",
        data: recentDates[13],
        tempoLeitura: "16 min"
      },
      {
        titulo: "Evolução da Alta Gastronomia",
        slug: "evolucao-da-alta-gastronomia",
        resumo: "Como a culinária refinada se desenvolveu ao longo dos séculos.",
        imagem: "https://source.unsplash.com/featured/?gourmet,cuisine",
        categoria: "Histórias da Gastronomia",
        data: recentDates[14],
        tempoLeitura: "18 min"
      },
      {
        titulo: "A Invenção do Restaurante",
        slug: "a-invencao-do-restaurante",
        resumo: "Como surgiu o conceito de restaurante que conhecemos hoje.",
        imagem: "https://source.unsplash.com/featured/?restaurant,history",
        categoria: "Histórias da Gastronomia",
        data: recentDates[23],
        tempoLeitura: "17 min"
      },
      {
        titulo: "Revolução da Cozinha Francesa",
        slug: "revolucao-da-cozinha-francesa",
        resumo: "Como a França transformou a gastronomia mundial.",
        imagem: "https://source.unsplash.com/featured/?french,cuisine",
        categoria: "Histórias da Gastronomia",
        data: recentDates[24],
        tempoLeitura: "15 min"
      },
      {
        titulo: "História dos Pratos Típicos Brasileiros",
        slug: "historia-dos-pratos-tipicos-brasileiros",
        resumo: "A origem e evolução dos pratos mais tradicionais do Brasil.",
        imagem: "https://source.unsplash.com/featured/?brazilian,food",
        categoria: "Histórias da Gastronomia",
        data: recentDates[33],
        tempoLeitura: "16 min"
      },
      {
        titulo: "Evolução dos Utensílios de Cozinha",
        slug: "evolucao-dos-utensilios-de-cozinha",
        resumo: "Como as ferramentas culinárias moldaram nossa forma de cozinhar.",
        imagem: "https://source.unsplash.com/featured/?kitchen,tools",
        categoria: "Histórias da Gastronomia",
        data: recentDates[34],
        tempoLeitura: "13 min"
      }
    ]

    const loadPost = async () => {
      try {
        const post = posts.find(p => p.slug === slug)
        if (!post) {
          router.push('/404')
          return
        }

        setPost(post)
        console.log('Post encontrado:', post.titulo)

        try {
          const generatedContent = await generateContent(post)
          console.log('Conteúdo gerado com sucesso')
          const formattedContent = formatContent(generatedContent)
          
          if (!formattedContent) {
            throw new Error('Erro ao formatar conteúdo')
          }

          setContent(formattedContent)
          setLoading(false)
        } catch (error) {
          console.error('Erro ao gerar/formatar conteúdo:', error)
          setContent(null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error)
        router.push('/404')
      }
    }

    loadPost()
  }, [slug])

  const generateContent = async (post) => {
    if (!GEMINI_API_KEY) {
      console.error('Chave da API Gemini não encontrada')
      throw new Error('Configuração da API ausente')
    }

    try {
      console.log('Iniciando geração de conteúdo para:', post.titulo)
      
      const prompt = `
Crie um artigo detalhado e aprofundado em português sobre "${post.titulo}". O artigo deve ser focado em culinária e gastronomia, com explicações detalhadas e exemplos práticos.
Siga EXATAMENTE esta estrutura e mantenha as seções, desenvolvendo cada tópico com profundidade:

INTRODUÇÃO:
[Três parágrafos introdutórios detalhados sobre o tema, explicando sua importância na culinária, seu impacto na gastronomia e uma visão geral do que será abordado]

HISTÓRIA E CONTEXTO:
• [Primeiro ponto histórico - desenvolva em 2-3 frases, incluindo datas e contexto]
• [Segundo ponto histórico - desenvolva em 2-3 frases, incluindo datas e contexto]
• [Terceiro ponto histórico - desenvolva em 2-3 frases, incluindo datas e contexto]
• [Quarto ponto histórico - desenvolva em 2-3 frases, incluindo datas e contexto]
• [Quinto ponto histórico - desenvolva em 2-3 frases, incluindo datas e contexto]

ASPECTOS TÉCNICOS:
• [Primeiro aspecto técnico - explique detalhadamente em 3-4 frases, incluindo o porquê e como fazer]
• [Segundo aspecto técnico - explique detalhadamente em 3-4 frases, incluindo o porquê e como fazer]
• [Terceiro aspecto técnico - explique detalhadamente em 3-4 frases, incluindo o porquê e como fazer]
• [Quarto aspecto técnico - explique detalhadamente em 3-4 frases, incluindo o porquê e como fazer]
• [Quinto aspecto técnico - explique detalhadamente em 3-4 frases, incluindo o porquê e como fazer]

DICAS PRÁTICAS:
• [Primeira dica prática - forneça uma explicação detalhada em 3-4 frases com exemplos concretos]
• [Segunda dica prática - forneça uma explicação detalhada em 3-4 frases com exemplos concretos]
• [Terceira dica prática - forneça uma explicação detalhada em 3-4 frases com exemplos concretos]
• [Quarta dica prática - forneça uma explicação detalhada em 3-4 frases com exemplos concretos]
• [Quinta dica prática - forneça uma explicação detalhada em 3-4 frases com exemplos concretos]

APLICAÇÕES:
• [Primeira aplicação - descreva em detalhes com 3-4 frases, incluindo exemplos práticos e situações reais]
• [Segunda aplicação - descreva em detalhes com 3-4 frases, incluindo exemplos práticos e situações reais]
• [Terceira aplicação - descreva em detalhes com 3-4 frases, incluindo exemplos práticos e situações reais]
• [Quarta aplicação - descreva em detalhes com 3-4 frases, incluindo exemplos práticos e situações reais]
• [Quinta aplicação - descreva em detalhes com 3-4 frases, incluindo exemplos práticos e situações reais]

CONCLUSÃO:
[Três parágrafos conclusivos que resumem os pontos principais, oferecem reflexões finais e incentivam a prática]

IMPORTANTE:
- Todo o conteúdo deve ser focado EXCLUSIVAMENTE em culinária e gastronomia
- Desenvolva cada tópico com profundidade e detalhes técnicos
- Inclua exemplos práticos e aplicações reais
- Use linguagem profissional mas acessível
- Mantenha o foco no tema específico do título
- Forneça informações precisas e atualizadas
- Inclua dicas de segurança quando relevante
- Mencione equipamentos e utensílios necessários quando apropriado`

      console.log('Enviando requisição para API Gemini')
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 4096,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        }
      )

      if (!response.ok) {
        console.error('Erro na resposta da API:', response.status)
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()
      console.log('Resposta recebida da API')
      console.log('Conteúdo bruto recebido:', data.candidates[0].content.parts[0].text)

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('Resposta da API sem conteúdo válido:', data)
        throw new Error('Formato de resposta inválido')
      }

      const generatedText = data.candidates[0].content.parts[0].text

      // Verifica se o texto gerado é uma string válida
      if (typeof generatedText !== 'string' || generatedText.trim().length === 0) {
        console.error('Texto gerado inválido:', generatedText)
        throw new Error('Conteúdo gerado inválido')
      }

      return generatedText

    } catch (error) {
      console.error('Erro detalhado na geração de conteúdo:', error)
      throw new Error(`Erro ao gerar conteúdo: ${error.message}`)
    }
  }

  const formatContent = (content) => {
    if (!content || typeof content !== 'string') {
      console.warn('Conteúdo inválido recebido:', content)
      return null
    }

    try {
      console.log('Iniciando formatação do conteúdo')
      
      const sections = {
        introducao: '',
        historia: [],
        tecnicos: [],
        dicas: [],
        aplicacoes: [],
        conclusao: ''
      }

      let currentSection = null
      const lines = content.split('\n')
      
      for (const line of lines) {
        const cleanLine = line.trim()
        if (!cleanLine) continue

        console.log('Processando linha:', cleanLine)

        // Identifica a seção atual
        if (cleanLine.includes('INTRODUÇÃO') || cleanLine.includes('Introdução')) {
          console.log('Encontrada seção: Introdução')
          currentSection = 'introducao'
          continue
        } else if (cleanLine.includes('HISTÓRIA E CONTEXTO') || cleanLine.includes('História e Contexto')) {
          console.log('Encontrada seção: História e Contexto')
          currentSection = 'historia'
          continue
        } else if (cleanLine.includes('ASPECTOS TÉCNICOS') || cleanLine.includes('Aspectos Técnicos')) {
          console.log('Encontrada seção: Aspectos Técnicos')
          currentSection = 'tecnicos'
          continue
        } else if (cleanLine.includes('DICAS PRÁTICAS') || cleanLine.includes('Dicas Práticas')) {
          console.log('Encontrada seção: Dicas Práticas')
          currentSection = 'dicas'
          continue
        } else if (cleanLine.includes('APLICAÇÕES') || cleanLine.includes('Aplicações')) {
          console.log('Encontrada seção: Aplicações')
          currentSection = 'aplicacoes'
          continue
        } else if (cleanLine.includes('CONCLUSÃO') || cleanLine.includes('Conclusão')) {
          console.log('Encontrada seção: Conclusão')
          currentSection = 'conclusao'
          continue
        }

        if (currentSection) {
          // Remove marcadores markdown e outros caracteres especiais
          if (cleanLine.startsWith('**') || cleanLine.endsWith('**')) continue
          
          // Para seções com lista (começando com * ou •)
          if (cleanLine.startsWith('*') || cleanLine.startsWith('•')) {
            const item = cleanLine.replace(/^[*•]\s*/, '').trim()
            if (currentSection !== 'introducao' && currentSection !== 'conclusao') {
              console.log(`Adicionando item à seção ${currentSection}:`, item)
              sections[currentSection].push(item)
            }
          } 
          // Para seções de texto contínuo
          else if (currentSection === 'introducao' || currentSection === 'conclusao') {
            if (cleanLine.length > 0) {
              console.log(`Adicionando texto à seção ${currentSection}:`, cleanLine)
              sections[currentSection] += (sections[currentSection] ? ' ' : '') + cleanLine
            }
          }
        }
      }

      // Verifica se temos conteúdo em cada seção
      console.log('Conteúdo formatado:', sections)
      
      if (sections.introducao || sections.historia.length > 0 || 
          sections.tecnicos.length > 0 || sections.dicas.length > 0 || 
          sections.aplicacoes.length > 0 || sections.conclusao) {
        return sections
      }

      console.warn('Nenhum conteúdo foi extraído das seções')
      return null
    } catch (error) {
      console.error('Erro ao formatar conteúdo:', error)
      return null
    }
  }

  if (!post || loading) {
    return (
      <Box 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bgGradient="linear(to-br, orange.50, teal.50, orange.50)"
      >
        <VStack spacing={6} p={8} bg="white" borderRadius="xl" boxShadow="xl" maxW="md" w="full">
          <Spinner size="xl" color="teal.500" thickness="4px" />
          <Text fontSize="lg" fontWeight="medium" textAlign="center">
            {!post ? "Buscando artigo..." : "Gerando conteúdo personalizado..."}
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            {!post 
              ? "Estamos localizando o artigo solicitado." 
              : "Estamos preparando um conteúdo especial para você. Isso pode levar alguns segundos."}
          </Text>
        </VStack>
      </Box>
    )
  }

  const sections = [
    { id: 'introducao', title: 'Introdução', icon: FaBookOpen, color: 'orange' },
    { id: 'historia', title: 'História e Contexto', icon: FaHistory, color: 'purple' },
    { id: 'tecnicos', title: 'Aspectos Técnicos', icon: FaCogs, color: 'blue' },
    { id: 'dicas', title: 'Dicas Práticas', icon: FaLightbulb, color: 'green' },
    { id: 'aplicacoes', title: 'Aplicações', icon: FaTools, color: 'teal' },
    { id: 'conclusao', title: 'Conclusão', icon: FaFlag, color: 'red' }
  ]

  const renderSectionContent = (sectionId) => {
    console.log('Renderizando seção:', sectionId)
    console.log('Conteúdo disponível:', content)

    if (!content) {
      return (
        <Text fontSize="lg" color="gray.500">
          Carregando conteúdo...
        </Text>
      )
    }

    const sectionContent = content[sectionId]
    console.log('Conteúdo da seção:', sectionContent)

    if (!sectionContent || (Array.isArray(sectionContent) && sectionContent.length === 0)) {
      return (
        <Text fontSize="lg" color="gray.500">
          Conteúdo indisponível para esta seção.
        </Text>
      )
    }

    if (Array.isArray(sectionContent)) {
      return (
        <List spacing={3}>
          {sectionContent.map((item, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <Icon as={MdCheckCircle} color={`${sections.find(s => s.id === sectionId).color}.500`} mr={3} />
              <Text>{item}</Text>
            </ListItem>
          ))}
        </List>
      )
    }

    return (
      <Text fontSize="lg" lineHeight="tall">
        {sectionContent}
      </Text>
    )
  }

  return (
    <>
      <Head>
        <title>{post ? `${post.titulo} - Receita do Dia` : 'Carregando...'}</title>
        <meta name="description" content={post?.resumo || 'Carregando artigo...'} />
      </Head>

      <Box 
        bgGradient="linear(to-br, orange.50, teal.50, orange.50)"
        minH="100vh"
        py={10}
      >
        <Container maxW="container.xl">
          {loading ? (
            <VStack spacing={4} align="center" justify="center" h="60vh">
              <Spinner size="xl" color="teal.500" thickness="4px" />
              <Text fontSize="lg" color="gray.600">Carregando artigo...</Text>
            </VStack>
          ) : !post ? (
            <VStack spacing={4} align="center" justify="center" h="60vh">
              <Text fontSize="xl" color="gray.600">Artigo não encontrado</Text>
              <Button colorScheme="teal" onClick={() => router.push('/blog')}>
                Voltar para o Blog
              </Button>
            </VStack>
          ) : (
            <VStack spacing={8} align="stretch">
              <Box 
                w="100%" 
                bg={cardBg} 
                borderRadius="xl" 
                overflow="hidden" 
                boxShadow="xl"
              >
                <Image
                  src={post.imagem}
                  alt={post.titulo}
                  height="400px"
                  width="100%"
                  objectFit="cover"
                />
                
                <Box p={8}>
                  <VStack align="start" spacing={6}>
                    <HStack spacing={4}>
                      <Tag size="md" colorScheme="teal">
                        {post.categoria}
                      </Tag>
                      <Text color="gray.500" fontSize="sm">
                        {new Date(post.data).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </Text>
                      <Text color="gray.500" fontSize="sm">
                        • {post.tempoLeitura} de leitura
                      </Text>
                    </HStack>

                    <Heading as="h1" size="xl">
                      {post.titulo}
                    </Heading>

                    <Text fontSize="lg" color="gray.600">
                      {post.resumo}
                    </Text>

                    <Divider />

                    <HStack align="start" spacing={8} w="full">
                      <VStack 
                        spacing={3} 
                        position="sticky"
                        top={4}
                        w="200px"
                        flexShrink={0}
                      >
                        {sections.map((section) => (
                          <Button
                            key={section.id}
                            w="full"
                            leftIcon={<Icon as={section.icon} />}
                            onClick={() => setSelectedSection(section.id)}
                            variant={selectedSection === section.id ? "solid" : "ghost"}
                            colorScheme={section.color}
                            justifyContent="flex-start"
                            py={6}
                          >
                            {section.title}
                          </Button>
                        ))}
                      </VStack>

                      <Box 
                        flex={1} 
                        bg={cardBg} 
                        p={6} 
                        borderRadius="lg" 
                        boxShadow="md"
                        minH="400px"
                      >
                        <Heading 
                          size="lg" 
                          mb={6}
                          color={`${sections.find(s => s.id === selectedSection).color}.500`}
                        >
                          <Icon 
                            as={sections.find(s => s.id === selectedSection).icon} 
                            mr={2} 
                          />
                          {sections.find(s => s.id === selectedSection).title}
                        </Heading>
                        {renderSectionContent(selectedSection)}
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              </Box>
            </VStack>
          )}
        </Container>
      </Box>
    </>
  )
} 