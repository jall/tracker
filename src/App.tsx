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
import React, {useState} from "react"
import Aims from "./aims/Aims"
import {Aim} from "./aims/types"
import {useAuth} from "./auth"
import LoginPage from "./auth/LoginPage"
import {DatabaseContext} from "./database"
import {createStubAims, notNothing} from "./helpers"

function App() {
  const auth = useAuth()
  const [aims, setAims] = useState(
    createStubAims().reduce((acc, aim) => {
      acc[aim.id] = aim
      return acc
    }, {} as Record<string, Aim | undefined>),
  )

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
            <Aims
              aims={Object.values(aims).filter(notNothing)}
              upsert={(aim) =>
                setAims({
                  ...aims,
                  [aim.id]: {
                    ...aim,
                    efforts: "efforts" in aim ? aim.efforts : [],
                  },
                })
              }
              remove={(id) => setAims({...aims, [id]: undefined})}
            />
          ) : (
            <LoginPage />
          )}
        </Flex>
      </ThemeProvider>
    </DatabaseContext.Provider>
  )
}

export default App
