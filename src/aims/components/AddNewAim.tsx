import {
  FormControl,
  FormHelperText,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/core"
import React, {FormEvent, useState} from "react"
import {FaPlus as PlusIcon} from "react-icons/fa"
import * as uuid from "uuid"
import {useAimsCollection} from "../hooks"

const helpText = "Add an aim"

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
            placeholder={helpText}
            onChange={(event: FormEvent<HTMLInputElement>) =>
              setTitle(event.currentTarget.value)
            }
          />
          {title ? (
            <FormHelperText id="title-helper-text">{helpText}</FormHelperText>
          ) : null}
        </FormControl>

        {title ? (
          <IconButton
            aria-label="Add aim"
            icon={<PlusIcon />}
            type="submit"
            bg="gray.500"
            color="white"
          />
        ) : null}
      </HStack>
    </form>
  )
}
