import {Spinner, Text} from "@chakra-ui/core"
import React from "react"
import {useCollectionData} from "react-firebase-hooks/firestore"
import * as uuid from "uuid"
import {useCurrentUserDocument} from "../../database"
import log from "../../logger"
import MainContent from "../components/MainContent"
import {Aim} from "../types"

export default function AimsPage() {
  const userDoc = useCurrentUserDocument()
  const collection = userDoc.collection("aims")

  const [aims, loading, error] = useCollectionData<Aim>(collection, {
    idField: "id",
  })

  if (loading) {
    return <Spinner size="xl" />
  }

  if (error) {
    log.error("Failed to load aims collection", {
      error,
      reason: error.message,
    })
    return (
      <Text color="red" size="xl">
        Sorry, something went wrong while fetching your Aims!
      </Text>
    )
  }

  return (
    <MainContent
      aims={aims || []}
      upsert={(aimOrInput) => {
        const aim: Aim = {
          id: uuid.v4(),
          efforts: [],
          ...aimOrInput,
        }
        return collection.doc(aim.id).set(aim)
      }}
      remove={(id) => collection.doc(id).delete()}
    />
  )
}
