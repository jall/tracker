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
          <Stack
            isInline={true}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack isInline={true} alignItems="center">
              <ListIcon icon="chevron-right" />
              <Tag>
                {aim.efforts.reduce(
                  (total, effort) => total + effort.amount,
                  0,
                )}
              </Tag>
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
                  upsert({
                    ...aim,
                    // TODO Buffer inputs to collapse rapid clicks into a single Effort
                    // Or find a prebuilt component that does it for me
                    efforts: [
                      ...aim.efforts,
                      {id: uuid.v4(), amount: 1, achievedAt: new Date()},
                    ],
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
                      effort.achievedAt > mostRecent.achievedAt
                        ? effort
                        : mostRecent,
                    first,
                  )
                  upsert({
                    ...aim,
                    efforts: aim.efforts.filter(
                      (e) => e.id !== mostRecentEffort.id,
                    ),
                  })
                }}
                icon="minus"
                bg="red.500"
                color="white"
              />

              <Menu>
                <MenuButton as={Button}>...</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => remove(aim.id)}>Delete aim</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Stack>
        </ListItem>
      ))}

      <AddNew add={upsert} />
    </List>
  )
}
