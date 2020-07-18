import {CSSReset, Flex, Heading, ThemeProvider} from "@chakra-ui/core"
import React, {useState} from "react"
import Aims from "./aims/Aims"
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
        bg="#3498db"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            Tracker
          </Heading>
        </Flex>
      </Flex>

      <Flex as="section" padding="1.5rem" justify="center">
        <Aims
          aims={Object.values(aims).filter(notNothing)}
          upsert={(aim) => setAims({...aims, [aim.id]: aim})}
          remove={(id) => setAims({...aims, [id]: undefined})}
        />
      </Flex>
    </ThemeProvider>
  )
}

export default App
