import {
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tag,
} from "@chakra-ui/core"
import React from "react"
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

            <IconButton
              aria-label="Remove aim"
              icon="minus"
              bg="#e74c3c"
              onClick={() => remove(aim.id)}
            />
          </Stack>
        </ListItem>
      ))}

      <AddNew add={upsert} />
    </List>
  )
}
