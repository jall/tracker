import {Flex, Grid, Stack} from "@chakra-ui/core"
import React from "react"
import {Aim} from "../types"
import AddNew from "./AddNewAim"
import AimCard from "./AimCard"

interface Props {
  aims: Array<Aim>
}

export default function CardGrid({aims}: Props) {
  return (
    <Stack spacing={10} width="full" padding={5}>
      <Grid
        gridTemplateColumns="repeat( auto-fit, 250px )"
        justifyContent="center"
        gap={3}
      >
        {aims.map((aim) => (
          <AimCard aim={aim} key={aim.id} />
        ))}
      </Grid>

      <Flex maxW="sm" alignSelf="center">
        <AddNew />
      </Flex>
    </Stack>
  )
}
