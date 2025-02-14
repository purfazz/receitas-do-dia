import { Box, Container, Stack, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Navbar() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="container.md">
        <Stack
          direction={'row'}
          spacing={8}
          py={4}
          justify={'flex-end'}
          align={'center'}
        >
          <NextLink href="/" passHref legacyBehavior>
            <Box
              as="a"
              cursor="pointer"
              _hover={{
                textDecoration: 'none',
                color: 'teal.500',
              }}
            >
              Início
            </Box>
          </NextLink>
          
          <NextLink href="/sobre" passHref legacyBehavior>
            <Box
              as="a"
              cursor="pointer"
              _hover={{
                textDecoration: 'none',
                color: 'teal.500',
              }}
            >
              Sobre
            </Box>
          </NextLink>
        </Stack>
      </Container>
    </Box>
  )
} 