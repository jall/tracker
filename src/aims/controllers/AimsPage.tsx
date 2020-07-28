import {Spinner, Text} from "@chakra-ui/core"
import React from "react"
import log from "../../logger"
import CardGrid from "../components/CardGrid"
import {useAims} from "../hooks"

export default function AimsPage() {
  const [aims, loading, error] = useAims()

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

  return <CardGrid aims={aims || []} />
}
