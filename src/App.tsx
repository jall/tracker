import {Box, CSSReset, Flex, Heading, ThemeProvider} from "@chakra-ui/core"
import React, {useState} from "react"
import Aims from "./aims"
import {Aim} from "./aims/types"
import {notNothing} from "./helpers"

function App() {
  const [aims, setAims] = useState<Record<string, Aim | undefined>>({
    "1": {id: "1", title: "Pullups"},
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
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            Chakra UI
          </Heading>
        </Flex>
      </Flex>

      <Flex
        as="section"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
      >
        <Box>
          <Aims
            aims={Object.values(aims).filter(notNothing)}
            upsert={(aim) => setAims({...aims, [aim.id]: aim})}
            remove={(id) => setAims({...aims, [id]: undefined})}
          />
        </Box>
      </Flex>
    </ThemeProvider>
  )
}

export default App
