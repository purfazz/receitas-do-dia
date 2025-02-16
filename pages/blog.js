import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Box, Container, Heading, Text, SimpleGrid, VStack, useColorModeValue, HStack, Tag } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaCogs, FaLeaf, FaGlobeAmericas, FaRecycle, FaBookOpen } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

export default function Blog() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const [categoriaAtiva, setCategoriaAtiva] = useState(null)

  const categorias = [
    { nome: "Técnicas Culinárias", cor: "blue.500", icon: FaCogs, imagem: "https://images.unsplash.com/photo-1591345793907-5a8d7d4f832c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { nome: "Nutrição", cor: "green.500", icon: FaLeaf, imagem: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { nome: "Cozinhas do Mundo", cor: "orange.500", icon: FaGlobeAmericas, imagem: "https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { nome: "Sustentabilidade", cor: "teal.500", icon: FaRecycle, imagem: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { nome: "Histórias da Gastronomia", cor: "purple.500", icon: FaBookOpen, imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" }
  ]

  // Função para gerar datas recentes
  const generateRecentDates = () => {
    const today = new Date()
    const dates = []
    for (let i = 0; i < 6; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const recentDates = generateRecentDates()

  const posts = [
    // Técnicas Culinárias
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
    // ... adicione mais 37 receitas de Técnicas Culinárias

    // Nutrição
    {
      titulo: "Proteínas Vegetais: Guia Completo",
      slug: "proteinas-vegetais-guia-completo",
      resumo: "Descubra as melhores fontes de proteína vegetal e como incorporá-las em suas refeições diárias.",
      imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Nutrição",
      data: recentDates[3],
      tempoLeitura: "10 min"
    },
    {
      titulo: "Alimentação Funcional na Prática",
      slug: "alimentacao-funcional-na-pratica",
      resumo: "Como incorporar alimentos funcionais na sua dieta diária de forma prática e saborosa.",
      imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Nutrição",
      data: recentDates[4],
      tempoLeitura: "12 min"
    },
    {
      titulo: "Guia de Vitaminas e Minerais",
      slug: "guia-de-vitaminas-e-minerais",
      resumo: "Entenda a importância de cada nutriente e onde encontrá-los naturalmente.",
      imagem: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Nutrição",
      data: recentDates[5],
      tempoLeitura: "15 min"
    },
    {
      titulo: "Alimentação Anti-inflamatória",
      slug: "alimentacao-antiinflamatoria",
      resumo: "Descubra os alimentos que ajudam a combater a inflamação no corpo e melhore sua saúde através da alimentação.",
      imagem: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Nutrição",
      data: recentDates[17],
      tempoLeitura: "13 min"
    },
    {
      titulo: "Probióticos Naturais",
      slug: "probioticos-naturais",
      resumo: "Aprenda sobre alimentos fermentados e outros probióticos naturais para uma flora intestinal saudável.",
      imagem: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Nutrição",
      data: recentDates[18],
      tempoLeitura: "10 min"
    },
    // ... adicione mais 37 receitas de Nutrição

    // Cozinhas do Mundo
    {
      titulo: "Explorando a Culinária Tailandesa",
      slug: "explorando-a-culinaria-tailandesa",
      resumo: "Uma jornada pelos sabores, ingredientes e técnicas tradicionais da Tailândia.",
      imagem: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Cozinhas do Mundo",
      data: recentDates[6],
      tempoLeitura: "12 min"
    },
    {
      titulo: "Segredos da Cozinha Italiana",
      slug: "segredos-da-cozinha-italiana",
      resumo: "Descubra as técnicas e ingredientes autênticos da culinária italiana.",
      imagem: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Cozinhas do Mundo",
      data: recentDates[7],
      tempoLeitura: "14 min"
    },
    {
      titulo: "Sabores do Oriente Médio",
      slug: "sabores-do-oriente-medio",
      resumo: "Explore os temperos e pratos tradicionais da culinária árabe.",
      imagem: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Cozinhas do Mundo",
      data: recentDates[8],
      tempoLeitura: "11 min"
    },
    {
      titulo: "Gastronomia Japonesa Tradicional",
      slug: "gastronomia-japonesa-tradicional",
      resumo: "Explore a rica tradição da culinária japonesa, suas técnicas e ingredientes únicos.",
      imagem: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Cozinhas do Mundo",
      data: recentDates[19],
      tempoLeitura: "14 min"
    },
    {
      titulo: "Sabores da Culinária Peruana",
      slug: "sabores-da-culinaria-peruana",
      resumo: "Descubra os sabores únicos e a diversidade da gastronomia peruana.",
      imagem: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Cozinhas do Mundo",
      data: recentDates[20],
      tempoLeitura: "12 min"
    },
    // ... adicione mais 37 receitas de Cozinhas do Mundo

    // Sustentabilidade
    {
      titulo: "Aproveitamento Integral dos Alimentos",
      slug: "aproveitamento-integral-dos-alimentos",
      resumo: "Aprenda a utilizar cascas, talos e sementes, reduzindo o desperdício e aumentando o valor nutricional.",
      imagem: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Sustentabilidade",
      data: recentDates[9],
      tempoLeitura: "7 min"
    },
    {
      titulo: "Horta Urbana: Guia Completo",
      slug: "horta-urbana-guia-completo",
      resumo: "Como criar e manter uma horta em casa, mesmo com pouco espaço.",
      imagem: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Sustentabilidade",
      data: recentDates[10],
      tempoLeitura: "13 min"
    },
    {
      titulo: "Compostagem Doméstica",
      slug: "compostagem-domestica",
      resumo: "Transforme resíduos orgânicos em adubo rico em nutrientes.",
      imagem: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Sustentabilidade",
      data: recentDates[11],
      tempoLeitura: "9 min"
    },
    {
      titulo: "Embalagens Sustentáveis",
      slug: "embalagens-sustentaveis",
      resumo: "Alternativas ecológicas para armazenar alimentos.",
      imagem: "https://images.unsplash.com/photo-1603568434493-8d3291ed5c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Sustentabilidade",
      data: recentDates[21],
      tempoLeitura: "8 min"
    },
    {
      titulo: "Pesca Sustentável",
      slug: "pesca-sustentavel",
      resumo: "Guia para consumo consciente de pescados.",
      imagem: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Sustentabilidade",
      data: recentDates[22],
      tempoLeitura: "11 min"
    },
    // ... adicione mais 37 receitas de Sustentabilidade

    // Histórias da Gastronomia
    {
      titulo: "A História do Chocolate",
      slug: "a-historia-do-chocolate",
      resumo: "Das civilizações antigas aos dias atuais: a fascinante jornada do chocolate através dos tempos.",
      imagem: "https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[12],
      tempoLeitura: "15 min"
    },
    {
      titulo: "Origem das Especiarias",
      slug: "origem-das-especiarias",
      resumo: "A fascinante história das rotas das especiarias e seu impacto na gastronomia mundial.",
      imagem: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[13],
      tempoLeitura: "16 min"
    },
    {
      titulo: "Evolução da Alta Gastronomia",
      slug: "evolucao-da-alta-gastronomia",
      resumo: "Como a culinária refinada se desenvolveu ao longo dos séculos.",
      imagem: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[14],
      tempoLeitura: "18 min"
    },
    {
      titulo: "A Invenção do Restaurante",
      slug: "a-invencao-do-restaurante",
      resumo: "Como surgiu o conceito de restaurante que conhecemos hoje.",
      imagem: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[23],
      tempoLeitura: "17 min"
    },
    {
      titulo: "Revolução da Cozinha Francesa",
      slug: "revolucao-da-cozinha-francesa",
      resumo: "Como a França transformou a gastronomia mundial.",
      imagem: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[24],
      tempoLeitura: "15 min"
    },
    {
      titulo: "Defumação Caseira",
      slug: "defumacao-caseira",
      resumo: "Aprenda a defumar alimentos em casa com equipamentos simples.",
      imagem: "https://images.unsplash.com/photo-1542528180-a1208c5169a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Técnicas Culinárias",
      data: recentDates[25],
      tempoLeitura: "13 min"
    },
    // ... adicione mais 37 receitas de Histórias da Gastronomia

    // Técnicas Culinárias (continuação)
    {
      titulo: "Confeitaria Básica",
      slug: "confeitaria-basica",
      resumo: "Domine as técnicas fundamentais de confeitaria.",
      imagem: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Técnicas Culinárias",
      data: recentDates[26],
      tempoLeitura: "14 min"
    },

    // Mais exemplos para Nutrição
    {
      titulo: "Superalimentos no Dia a Dia",
      slug: "superalimentos-no-dia-a-dia",
      resumo: "Como incorporar superalimentos em suas refeições diárias.",
      imagem: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Nutrição",
      data: recentDates[27],
      tempoLeitura: "9 min"
    },
    {
      titulo: "Nutrição para Atletas",
      slug: "nutricao-para-atletas",
      resumo: "Guia nutricional para melhorar o desempenho esportivo.",
      imagem: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Nutrição",
      data: recentDates[28],
      tempoLeitura: "12 min"
    },

    // Mais exemplos para Cozinhas do Mundo
    {
      titulo: "Culinária Indiana Autêntica",
      slug: "culinaria-indiana-autentica",
      resumo: "Descubra os segredos dos curry e masalas indianos.",
      imagem: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Cozinhas do Mundo",
      data: recentDates[29],
      tempoLeitura: "15 min"
    },
    {
      titulo: "Cozinha Mediterrânea",
      slug: "cozinha-mediterranea",
      resumo: "Explore os sabores saudáveis da dieta mediterrânea.",
      imagem: "https://images.unsplash.com/photo-1556316918-880f9e893822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Cozinhas do Mundo",
      data: recentDates[30],
      tempoLeitura: "11 min"
    },

    // Mais exemplos para Sustentabilidade
    {
      titulo: "Agricultura Urbana",
      slug: "agricultura-urbana",
      resumo: "Como criar uma horta produtiva em pequenos espaços.",
      imagem: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Sustentabilidade",
      data: recentDates[31],
      tempoLeitura: "10 min"
    },
    {
      titulo: "Cozinha Zero Desperdício",
      slug: "cozinha-zero-desperdicio",
      resumo: "Dicas práticas para aproveitar 100% dos alimentos.",
      imagem: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Sustentabilidade",
      data: recentDates[32],
      tempoLeitura: "8 min"
    },

    // Mais exemplos para Histórias da Gastronomia
    {
      titulo: "História dos Pratos Típicos",
      slug: "historia-dos-pratos-tipicos",
      resumo: "Explore a origem e evolução dos pratos mais famosos do mundo.",
      imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[21],
      tempoLeitura: "15 min"
    },
    {
      titulo: "Evolução da Gastronomia",
      slug: "evolucao-da-gastronomia",
      resumo: "Uma jornada pela história da culinária através dos séculos.",
      imagem: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[22],
      tempoLeitura: "12 min"
    },
    {
      titulo: "Técnicas de Fermentação",
      slug: "tecnicas-de-fermentacao",
      resumo: "Aprenda sobre os diferentes processos de fermentação na culinária.",
      imagem: "https://images.unsplash.com/photo-1555951015-6da899b5c2cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Técnicas Culinárias",
      data: recentDates[23],
      tempoLeitura: "10 min"
    },
    {
      titulo: "Técnicas de Cocção",
      slug: "tecnicas-de-coccao",
      resumo: "Descubra os diferentes métodos de cozimento dos alimentos.",
      imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Técnicas Culinárias",
      data: recentDates[25],
      tempoLeitura: "11 min"
    },
    {
      titulo: "Temperos e Especiarias",
      slug: "temperos-e-especiarias",
      resumo: "Guia completo dos principais temperos e suas aplicações.",
      imagem: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Técnicas Culinárias",
      data: recentDates[26],
      tempoLeitura: "9 min"
    },
    {
      titulo: "Cozinha Molecular",
      slug: "cozinha-molecular",
      resumo: "Explore as técnicas modernas da gastronomia molecular.",
      imagem: "https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Técnicas Culinárias",
      data: recentDates[27],
      tempoLeitura: "13 min"
    },
    {
      titulo: "Utensílios Essenciais",
      slug: "utensilios-essenciais",
      resumo: "Conheça as ferramentas fundamentais para uma cozinha funcional.",
      imagem: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Técnicas Culinárias",
      data: recentDates[28],
      tempoLeitura: "7 min"
    },
    {
      titulo: "Influências Gastronômicas",
      slug: "influencias-gastronomicas",
      resumo: "Como diferentes culturas moldaram a culinária moderna.",
      imagem: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[29],
      tempoLeitura: "14 min"
    },
    {
      titulo: "Grandes Chefs da História",
      slug: "grandes-chefs-da-historia",
      resumo: "Conheça os chefs que revolucionaram a gastronomia mundial.",
      imagem: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[30],
      tempoLeitura: "16 min"
    },
    {
      titulo: "Revolução da Cozinha Moderna",
      slug: "revolucao-da-cozinha-moderna",
      resumo: "Como a tecnologia transformou a forma de cozinhar.",
      imagem: "https://images.unsplash.com/photo-1556910633-5099dc3971e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      categoria: "Histórias da Gastronomia",
      data: recentDates[31],
      tempoLeitura: "13 min"
    }
  ]

  // Filtra os posts baseado na categoria selecionada
  const postsExibidos = categoriaAtiva
    ? posts.filter(post => post.categoria === categoriaAtiva)
    : posts

  // Função para lidar com o clique na categoria
  const handleCategoriaClick = (categoria) => {
    if (categoriaAtiva === categoria) {
      setCategoriaAtiva(null) // Desseleciona se clicar na mesma categoria
    } else {
      setCategoriaAtiva(categoria)
    }
  }

  return (
    <>
      <Head>
        <title>Blog Culinário - Receita do Dia</title>
        <meta name="description" content="Artigos aprofundados sobre gastronomia, técnicas culinárias, nutrição e história da alimentação." />
        <meta name="keywords" content="blog culinária, gastronomia, técnicas culinárias, nutrição, história da alimentação" />
      </Head>

      <Box 
        position="relative"
        minH="100vh"
        py={10}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="url('https://images.unsplash.com/photo-1493808172977-662b61dd4982?q=80&w=1712&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          zIndex={0}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={useColorModeValue('whiteAlpha.600', 'blackAlpha.700')}
          zIndex={1}
        />
        <Container maxW="container.xl" position="relative" zIndex={2}>
          <VStack spacing={12}>
            {/* Header Section */}
            <Box 
              textAlign="center" 
              w="full"
              h="300px"
              position="relative"
              overflow="hidden"
              borderRadius="xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1493808172977-662b61dd4982?q=80&w=1712&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Imagem de fundo do blog"
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
                quality={100}
                priority
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="blackAlpha.600"
                zIndex={1}
              />
              <VStack
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={2}
                spacing={4}
                w="full"
                px={4}
              >
                <Heading
                  color="white"
                  size="2xl"
                  textShadow="2px 2px 4px rgba(0,0,0,0.4)"
                >
                  Blog Culinário
                </Heading>
                <Text
                  color="white"
                  fontSize="xl"
                  maxW="2xl"
                  textShadow="1px 1px 2px rgba(0,0,0,0.4)"
                >
                  Descubra receitas, técnicas e histórias fascinantes do mundo da gastronomia
                </Text>
              </VStack>
            </Box>

            {/* Categorias */}
            <Box w="full">
              <SimpleGrid 
                columns={[2, 3, 5]} 
                spacing={4} 
                mb={12}
                mx="auto"
                maxW="4xl"
              >
                {categorias.map((cat) => (
                  <Box
                    key={cat.nome}
                    h="150px"
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => handleCategoriaClick(cat.nome)}
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: 'xl',
                    }}
                  >
                    {cat.imagem && (
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bgImage={`url('${cat.imagem}')`}
                        bgSize="cover"
                        bgPosition={cat.nome === "Nutrição" ? "top center" : "center"}
                        opacity={0.9}
                        transition="opacity 0.3s"
                      />
                    )}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg={cat.cor}
                      opacity={categoriaAtiva === cat.nome ? 0.7 : 0.5}
                      transition="opacity 0.3s"
                    />
                    <VStack
                      position="relative"
                      zIndex={2}
                      h="100%"
                      justify="center"
                      spacing={2}
                      p={4}
                    >
                      <Icon 
                        as={cat.icon} 
                        boxSize={8} 
                        color="white"
                      />
                      <Text 
                        color="white"
                        fontWeight="bold"
                        fontSize="lg"
                        textAlign="center"
                        textShadow="1px 1px 2px rgba(0,0,0,0.4)"
                      >
                        {cat.nome}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            {/* Artigos */}
            <SimpleGrid 
              columns={[1, 2, 3]} 
              spacing={8}
              w="full"
            >
              {postsExibidos.map((post, index) => (
                <NextLink 
                  key={index}
                  href={`/blog/${post.slug}`}
                  passHref
                  legacyBehavior
                >
                  <Box
                    as="a"
                    display="block"
                    position="relative"
                    _hover={{ 
                      textDecoration: 'none',
                      transform: 'translateY(-8px)',
                      '& > div': {
                        boxShadow: '2xl'
                      }
                    }}
                    transition="all 0.3s"
                  >
                    <Box
                      bg={cardBg}
                      borderRadius="2xl"
                      overflow="hidden"
                      boxShadow="lg"
                      transition="all 0.3s"
                    >
                      <Box position="relative" height="240px">
                        <Image
                          src={post.imagem}
                          alt={post.titulo}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Box>
                      
                      <Box p={6}>
                        <VStack align="start" spacing={4}>
                          <HStack spacing={2}>
                            <Tag
                              size="md"
                              variant="subtle"
                              colorScheme={
                                categorias.find(c => c.nome === post.categoria)?.cor.split('.')[0] || "teal"
                              }
                              borderRadius="full"
                            >
                              {post.categoria}
                            </Tag>
                            <Text fontSize="sm" color="gray.500">
                              {post.tempoLeitura} de leitura
                            </Text>
                          </HStack>

                          <Heading 
                            as="h2" 
                            size="md"
                            lineHeight="tall"
                          >
                            {post.titulo}
                          </Heading>

                          <Text 
                            color="gray.600"
                            noOfLines={3}
                            fontSize="sm"
                          >
                            {post.resumo}
                          </Text>

                          <Text 
                            fontSize="sm" 
                            color="gray.500"
                            fontWeight="medium"
                          >
                            {new Date(post.data).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </Text>
                        </VStack>
                      </Box>
                    </Box>
                  </Box>
                </NextLink>
              ))}
            </SimpleGrid>

            {/* Newsletter Section */}
            <Box 
              w="full" 
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="2xl"
              p={8}
              textAlign="center"
              boxShadow="xl"
              mt={12}
            >
              <VStack spacing={6}>
                <Heading as="h3" size="lg">
                  Fique por Dentro das Novidades
                </Heading>
                <Text maxW="2xl" mx="auto" color="gray.600">
                  Receba artigos exclusivos, dicas culinárias e novidades do mundo da gastronomia 
                  diretamente no seu e-mail.
                </Text>
                <Box maxW="md" w="full" mx="auto">
                  {/* Componente NewsletterForm será usado aqui */}
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  )
} 