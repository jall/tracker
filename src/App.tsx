import {
  Box,
  Button,
  ChakraProvider,
  CSSReset,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/core"
import theme from "@chakra-ui/theme"
import * as firebase from "firebase/app"
import React from "react"
import {FaSignOutAlt as LogoutIcon} from "react-icons/fa"
import AimsPage from "./aims/controllers/AimsPage"
import {useAuth} from "./auth"
import LoginPage from "./auth/LoginPage"

function App() {
  const [user, loading] = useAuth()

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />

      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="gray.500"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" color="white">
            Tracker
          </Heading>
        </Flex>

        {user ? (
          <Box>
            <Button
              rightIcon={<LogoutIcon />}
              bg="gray.300"
              color="gray.700"
              onClick={() => firebase.auth().signOut()}
            >
              Logout
            </Button>
          </Box>
        ) : null}
      </Flex>

      <Flex as="section" padding="1.5rem" justify="center">
        {loading ? <Spinner size="xl" /> : user ? <AimsPage /> : <LoginPage />}
      </Flex>
    </ChakraProvider>
  )
}

export default App
