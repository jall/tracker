import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
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
    <List spacing={3}>
      {aims.map((aim) => (
        <ListItem key={aim.id}>
          <AimItem aim={aim} upsert={upsert} remove={() => remove(aim.id)} />
        </ListItem>
      ))}

      <AddNew add={upsert} />
    </List>
  )
}

interface AimProps {
  aim: Aim
  upsert: (aim: Aim | AimInput) => void
  remove: () => void
}

function AimItem({aim, upsert, remove}: AimProps) {
  // const [tempEffort, setTempEffort] = useState(0)
  const totalEfforts = aim.efforts.reduce(
    (total, effort) => total + effort.amount,
    0,
  )
  const accumulateEffortClicks = accumulate(() => {
    // setTempEffort(tempEffort + 1)
  }, 250)
  return (
    <Stack isInline={true} alignItems="center" justifyContent="space-between">
      <Stack isInline={true} alignItems="center">
        <ListIcon icon="chevron-right" />
        <Tag>{totalEfforts}</Tag>
        {/* {tempEffort ? <Tag>+ {tempEffort}</Tag> : null} */}
        <Editable
          defaultValue={aim.title}
          onChange={(title) => upsert({...aim, title})}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Stack>

      <Stack isInline={true} alignItems="center">
        <IconButton
          aria-label="Increment effort"
          icon="add"
          onClick={() =>
            accumulateEffortClicks().then((clicks) => {
              // setTempEffort(0)
              upsert({
                ...aim,
                efforts: [
                  ...aim.efforts,
                  {
                    id: uuid.v4(),
                    amount: clicks.length,
                    achievedAt: new Date(),
                  },
                ],
              })
            })
          }
          bg="green.400"
          color="white"
        />

        <IconButton
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
          icon="minus"
          bg="red.500"
          color="white"
          isDisabled={totalEfforts === 0}
        />

        <Menu>
          <MenuButton as={Button}>...</MenuButton>
          <MenuList>
            <MenuItem onClick={remove}>Delete aim</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Stack>
  )
}
