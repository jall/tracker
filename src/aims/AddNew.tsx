import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/core"
import React, {FormEvent, useState} from "react"
import {Aim} from "./types"

interface Props {
  add: (aim: Aim) => void
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
        bg="#2ecc71"
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
