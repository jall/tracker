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
import "firebase/auth"
import React, {useState} from "react"
import Aims from "./aims/Aims"
import {Aim} from "./aims/types"
import Auth from "./auth"
import {createStubAims, notNothing} from "./helpers"

firebase.initializeApp({
  apiKey: "AIzaSyBaj8c0cRnk2DplDZVXGEoemgqz3hPH23s",
  authDomain: "tracker-jall.firebaseapp.com",
  databaseURL: "https://tracker-jall.firebaseio.com",
  projectId: "tracker-jall",
  storageBucket: "tracker-jall.appspot.com",
  messagingSenderId: "692454126753",
  appId: "1:692454126753:web:c5e1f56f7c669f1c99ace0",
})

function App() {
  const [aims, setAims] = useState(
    createStubAims().reduce((acc, aim) => {
      acc[aim.id] = aim
      return acc
    }, {} as Record<string, Aim | undefined>),
  )

  const [auth, setAuth] = useState<
    "unchecked" | "authenticated" | "unauthenticated"
  >("unchecked")
  firebase.auth().onAuthStateChanged((user) => {
    setAuth(user === null ? "unauthenticated" : "authenticated")
  })

  return (
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
          <Auth />
        )}
      </Flex>
    </ThemeProvider>
  )
}

export default App
