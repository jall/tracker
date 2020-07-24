import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/core"
import React from "react"
import * as uuid from "uuid"
import {accumulate} from "../helpers"
import AddNew from "./AddNew"
import {Aim, AimInput} from "./types"

interface Props {
  aims: Array<Aim>
  upsert: (aim: Aim | AimInput) => void
  remove: (id: string) => void
}

export default function Aims({aims, upsert, remove}: Props) {
  return (
    <Stack spacing={10} width="100%" padding={5}>
      <Grid
        gridTemplateColumns="repeat( auto-fit, 250px )"
        justifyContent="center"
        gap={3}
      >
        {aims.map((aim) => (
          <Box key={aim.id} bg="gray.100" boxShadow="md">
            <AimItem aim={aim} upsert={upsert} remove={() => remove(aim.id)} />
          </Box>
        ))}
      </Grid>

      <AddNew add={upsert} />
    </Stack>
  )
}

interface AimProps {
  aim: Aim
  upsert: (aim: Aim | AimInput) => void
  remove: () => void
}

function AimItem({aim, upsert, remove}: AimProps) {
  const totalEfforts = aim.efforts.reduce(
    (total, effort) => total + effort.amount,
    0,
  )
  const accumulateEffortClicks = accumulate(() => void null, 250)

  const IncrementEffortButton = (props: {
    amount: number
    onClick: () => Promise<Array<void>>
  }) => (
    <Button
      aria-label={`Increment effort by ${props.amount}`}
      onClick={() =>
        props.onClick().then((clicks) =>
          upsert({
            ...aim,
            efforts: [
              ...aim.efforts,
              {
                id: uuid.v4(),
                amount: clicks.length * props.amount,
                achievedAt: new Date(),
              },
            ],
          }),
        )
      }
      bg="blue.400"
      color="white"
      height="12"
      width="12"
      borderRadius="50%"
      margin="1"
    >
      +{props.amount}
    </Button>
  )

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      paddingX="10"
      paddingTop="5"
    >
      <Stack isInline justify="center">
        <Editable
          defaultValue={aim.title}
          onChange={(title) => upsert({...aim, title})}
          size="l"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>

        <Box alignSelf="end">
          <Menu>
            <MenuButton as={Button}>...</MenuButton>
            <MenuList>
              <MenuItem onClick={remove}>Delete aim</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Stack>

      <Stack
        bg="white"
        width="100%"
        alignItems="center"
        padding={1}
        borderRadius={4}
      >
        <Text fontSize="3xl" margin={0}>
          {totalEfforts}
        </Text>
        <Text fontSize="xs">Today</Text>
      </Stack>

      <Stack alignItems="center" spacing={0}>
        <Stack isInline={true} justify="space-between" alignItems="center">
          <IncrementEffortButton amount={1} onClick={accumulateEffortClicks} />
          <IncrementEffortButton amount={5} onClick={accumulateEffortClicks} />
          <IncrementEffortButton amount={10} onClick={accumulateEffortClicks} />
        </Stack>

        <Button
          aria-label="Remove most recent effort"
          onClick={() => {
            const [first, ...rest] = aim.efforts
            const mostRecentEffort = rest.reduce(
              (mostRecent, effort) =>
                effort.achievedAt > mostRecent.achievedAt ? effort : mostRecent,
              first,
            )
            upsert({
              ...aim,
              efforts: aim.efforts.filter((e) => e.id !== mostRecentEffort.id),
            })
          }}
          color="gray.300"
          fontSize="3xl"
          width="100%"
          isDisabled={totalEfforts === 0}
        >
          ⤺
        </Button>
      </Stack>
    </Stack>
  )
}
