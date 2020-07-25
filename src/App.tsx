import {
  Box,
  Button,
  CSSReset,
  Flex,
  Heading,
  Spinner,
  ThemeProvider,
} from "@chakra-ui/core"
import * as firebase from "firebase/app"
import React from "react"
import AimsPage from "./aims/controllers/AimsPage"
import {useAuth} from "./auth"
import LoginPage from "./auth/LoginPage"
import {DatabaseContext} from "./database"

function App() {
  const auth = useAuth()

  return (
    <DatabaseContext.Provider value={firebase.firestore()}>
      <ThemeProvider>
        <CSSReset />

        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg="blue.400"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" color="white">
              Tracker
            </Heading>
          </Flex>

          {auth === "authenticated" ? (
            <Box>
              <Button
                leftIcon="close"
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
          {auth === "unchecked" ? (
            <Spinner size="xl" />
          ) : auth === "authenticated" ? (
            <AimsPage />
          ) : (
            <LoginPage />
          )}
        </Flex>
      </ThemeProvider>
    </DatabaseContext.Provider>
  )
}

export default App
