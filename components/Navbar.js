import { Box, Container, Stack, useColorModeValue, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverColor = useColorModeValue('teal.500', 'teal.300')

  const isActive = (path) => router.pathname === path

  const links = [
    { href: '/', label: 'Início' },
    { href: '/blog', label: 'Blog' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/privacidade', label: 'Privacidade' }
  ]

  return (
    <Box
      bg={bgColor}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Container maxW="container.lg">
        <Stack
          direction={'row'}
          spacing={8}
          py={4}
          justify={'space-between'}
          align={'center'}
        >
          <NextLink href="/" passHref legacyBehavior>
            <Box
              as="a"
              fontWeight="bold"
              fontSize="xl"
              color="teal.500"
              _hover={{
                textDecoration: 'none',
                color: hoverColor,
              }}
            >
              Receita do Dia
            </Box>
          </NextLink>

          <Stack direction={'row'} spacing={4}>
            {links.map((link) => (
              <NextLink key={link.href} href={link.href} passHref legacyBehavior>
                <Button
                  variant={isActive(link.href) ? "solid" : "ghost"}
                  colorScheme="teal"
                  size="sm"
                  _hover={{
                    textDecoration: 'none',
                    bg: isActive(link.href) ? undefined : 'teal.50',
                  }}
                >
                  {link.label}
                </Button>
              </NextLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
} 