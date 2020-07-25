import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/core"
import React, {FormEvent, useState} from "react"
import {AimInput} from "../types"

interface Props {
  add: (aim: AimInput) => void
}

export default function AddNewAim({add}: Props) {
  const [title, setTitle] = useState<string | null>(null)
  return (
    <form
      action="#"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (title) {
          add({title})
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
