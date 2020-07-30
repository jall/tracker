import {Box, Button, CSSReset, Flex, Spinner} from "@chakra-ui/core"
import * as firebase from "firebase/app"
import React from "react"
import {FaSignOutAlt as LogoutIcon} from "react-icons/fa"
import AimsPage from "./aims/controllers/AimsPage"
import {useAuth} from "./auth"
import LoginPage from "./auth/LoginPage"

function App() {
  const [user, loading] = useAuth()

  return (
    <>
      <CSSReset />

      <Flex
        as="nav"
        align="center"
        justify="flex-end"
        paddingX={4}
        paddingY={2}
      >
        {user ? (
          <Box>
            <Button
              rightIcon={<LogoutIcon color="gray.300" />}
              color="gray.300"
              variant="ghost"
              onClick={() => firebase.auth().signOut()}
            >
              Logout
            </Button>
          </Box>
        ) : null}
      </Flex>

      <Flex as="main" paddingX="1.5rem" justify="center">
        {loading ? <Spinner size="xl" /> : user ? <AimsPage /> : <LoginPage />}
      </Flex>
    </>
  )
}

export default App
