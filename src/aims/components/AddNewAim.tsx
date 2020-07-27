import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/core"
import React, {FormEvent, useState} from "react"
import * as uuid from "uuid"
import {useAimsCollection} from "../hooks"

export default function AddNewAim() {
  const collection = useAimsCollection()
  const [title, setTitle] = useState<string | null>(null)

  return (
    <form
      action="#"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (title) {
          collection.add({id: uuid.v4(), title})
        }

        setTitle(null)
      }}
    >
      <Stack isInline justify="center">
        <FormControl>
          <Input
            type="text"
            id="title"
            aria-describedby="title-helper-text"
            value={title || ""}
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
          bg="green.400"
          color="white"
        >
          Add
        </Button>
      </Stack>
    </form>
  )
}
