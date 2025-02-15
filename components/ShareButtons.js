import { HStack, IconButton, useClipboard, useToast } from '@chakra-ui/react'
import { FaWhatsapp, FaPinterest, FaLink } from 'react-icons/fa'

export default function ShareButtons({ title, url }) {
  const { hasCopied, onCopy } = useClipboard(url)
  const toast = useToast()

  const shareOnWhatsApp = () => {
    const text = `${title}\n\nVeja esta receita deliciosa:\n${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareOnPinterest = () => {
    const description = `${title} - Receita completa com passo a passo`
    window.open(
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`,
      '_blank'
    )
  }

  const handleCopyLink = () => {
    onCopy()
    toast({
      title: 'Link copiado!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <HStack spacing={2}>
      <IconButton
        aria-label="Compartilhar no WhatsApp"
        icon={<FaWhatsapp />}
        colorScheme="whatsapp"
        onClick={shareOnWhatsApp}
        rounded="full"
      />
      <IconButton
        aria-label="Compartilhar no Pinterest"
        icon={<FaPinterest />}
        colorScheme="red"
        onClick={shareOnPinterest}
        rounded="full"
      />
      <IconButton
        aria-label="Copiar link"
        icon={<FaLink />}
        colorScheme="gray"
        onClick={handleCopyLink}
        rounded="full"
      />
    </HStack>
  )
} 