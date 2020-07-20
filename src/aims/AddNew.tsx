import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/core"
import React, {FormEvent, useState} from "react"
import * as uuid from "uuid"
import {AimInput} from "./types"

interface Props {
  add: (aim: AimInput) => void
}

export default function AddNew({add}: Props) {
  const [title, setTitle] = useState<string | null>(null)
  return (
    <Stack isInline>
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
        onClick={() => {
          if (title) {
            add({id: uuid.v4(), title})
          }
          setTitle(null)
        }}
      >
        Add
      </Button>
    </Stack>
  )
}
