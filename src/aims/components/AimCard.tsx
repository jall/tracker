import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/core"
import React from "react"
import * as uuid from "uuid"
import {accumulate} from "../../helpers"
import {Aim, AimInput} from "../types"

interface Props {
  aim: Aim
  upsert: (aim: Aim | AimInput) => void
  remove: () => void
}

export default function AimCard({aim, upsert, remove}: Props) {
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
        bg="cyan.100"
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
