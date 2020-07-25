import {Box, Grid, Stack} from "@chakra-ui/core"
import React from "react"
import AddNew from "./AddNewAim"
import AimCard from "./AimCard"
import {Aim, AimInput} from "../types"

interface Props {
  aims: Array<Aim>
  upsert: (aim: Aim | AimInput) => void
  remove: (id: string) => void
}

export default function MainContent({aims, upsert, remove}: Props) {
  return (
    <Stack spacing={10} width="100%" padding={5}>
      <Grid
        gridTemplateColumns="repeat( auto-fit, 250px )"
        justifyContent="center"
        gap={3}
      >
        {aims.map((aim) => (
          <Box key={aim.id} bg="gray.100" boxShadow="md">
            <AimCard aim={aim} upsert={upsert} remove={() => remove(aim.id)} />
          </Box>
        ))}
      </Grid>

      <AddNew add={upsert} />
    </Stack>
  )
}
