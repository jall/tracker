import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/core"
import React from "react"
import * as uuid from "uuid"
import {accumulate} from "../../helpers"
import {useAimDoc, useEfforts, useEffortsCollection} from "../hooks"
import {Aim} from "../types"

interface Props {
  aim: Aim
}

export default function AimCard({aim}: Props) {
  const aimDoc = useAimDoc(aim.id)
  const effortsCollection = useEffortsCollection(aim.id)
  const [efforts, loading, error] = useEfforts(aim.id)

  if (loading) {
    return (
      <Container>
        <Spinner size="xl" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Text color="red" fontSize="xl">
          Sorry, something went wrong while fetching your Efforts!
        </Text>
      </Container>
    )
  }

  const totalEfforts = (efforts || []).reduce(
    (total, effort) => total + effort.amount,
    0,
  )

  const accumulateEffortClicks = accumulate(() => void null, 250)

  const IncrementEffortButton = ({
    amount,
    onClick,
  }: {
    amount: number
    onClick: () => Promise<Array<void>>
  }) => (
    <Button
      aria-label={`Increment effort by ${amount}`}
      onClick={() =>
        onClick().then((clicks) =>
          effortsCollection.add({
            id: uuid.v4(),
            amount: clicks.length * amount,
            achievedAt: new Date(),
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
      +{amount}
    </Button>
  )

  return (
    <Container>
      <HStack>
        <Editable
          defaultValue={aim.title}
          onChange={(title) => aimDoc.set({title}, {merge: true})}
          size="l"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>

        <Box>
          <Menu>
            <MenuButton as={Button} fontSize="3xl" fontWeight="bold">
              ⋯
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => aimDoc.delete()}>Delete aim</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>

      <Stack
        bg="cyan.100"
        width="full"
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
        <HStack justify="space-between" alignItems="center">
          <IncrementEffortButton amount={1} onClick={accumulateEffortClicks} />
          <IncrementEffortButton amount={5} onClick={accumulateEffortClicks} />
          <IncrementEffortButton amount={10} onClick={accumulateEffortClicks} />
        </HStack>

        <Button
          aria-label="Remove most recent effort"
          onClick={() => {
            if (efforts && efforts.length > 0) {
              const [mostRecentEffort] = efforts
              effortsCollection.doc(mostRecentEffort.id).delete()
            }
          }}
          color="gray.300"
          fontSize="3xl"
          width="full"
          isDisabled={totalEfforts === 0}
        >
          ⤺
        </Button>
      </Stack>
    </Container>
  )
}

const Container = ({children}: {children: React.ReactNode}) => (
  <Stack
    bg="gray.100"
    boxShadow="md"
    alignItems="center"
    justifyContent="space-between"
    paddingX="10"
    paddingTop="5"
  >
    {children}
  </Stack>
)
