import React, {useState, FormEvent} from "react"
import {
  List,
  ListItem,
  ListIcon,
  IconButton,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Editable,
  EditablePreview,
  EditableInput,
  Button,
} from "@chakra-ui/core"
import {Aim} from "./types"

interface Props {
  aims: Array<Aim>
  upsert: (aim: Aim) => void
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
              onClick={() => remove(aim.id)}
            />
          </Stack>
        </ListItem>
      ))}
      <AddNew add={upsert} />
    </List>
  )
}

function AddNew({add}: {add: (aim: Aim) => void}) {
  const [title, setTitle] = useState<string | null>(null)
  return (
    <Stack isInline>
      <FormControl>
        <Input
          type="text"
          id="title"
          aria-describedby="title-helper-text"
          onChange={(event: FormEvent<HTMLInputElement>) =>
            setTitle(event.currentTarget.value)
          }
        />
        <FormHelperText id="title-helper-text">Add a new aim</FormHelperText>
      </FormControl>
      <Button
        aria-label="Add aim"
        leftIcon="add"
        type="submit"
        onClick={() => {
          if (title) {
            add({id: `${Math.random()}`, title})
          }
          setTitle(null)
        }}
      >
        Add
      </Button>
    </Stack>
  )
}
