import {
  Button,
  FormControl,
  FormHelperText,
  HStack,
  Input,
} from "@chakra-ui/core"
import React, {FormEvent, useState} from "react"
import {FaPlus as PlusIcon} from "react-icons/fa"
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
          collection.add({id: uuid.v4(), createdAt: new Date(), title})
        }

        setTitle(null)
      }}
    >
      <HStack align="flex-start">
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
          rightIcon={<PlusIcon />}
          type="submit"
          bg="green.400"
          color="white"
        >
          Add
        </Button>
      </HStack>
    </form>
  )
}
