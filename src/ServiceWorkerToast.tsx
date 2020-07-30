import {useToast} from "@chakra-ui/core"
import React, {useEffect} from "react"

export default function ServiceWorkerToast() {
  const toast = useToast()

  useEffect(() => {
    const listener = (event: CustomEvent<ServiceWorkerStatus>) => {
      console.log("ServiceWorkerToast", event)
      switch (event.detail) {
        case "installed":
          toast({
            title: "Ready to work offline",
            status: "info",
            isClosable: true,
            position: "bottom",
          })
          break

        case "ready-to-update":
          toast({
            title: "Update available",
            description:
              "Please close all Tracker tabs to update to the latest version",
            status: "warning",
            isClosable: true,
            position: "bottom",
          })
          break
      }
    }

    window.addEventListener("service-worker-status" as any, listener)

    return () =>
      window.removeEventListener("service-worker-status" as any, listener)
  }, [toast])

  return <></>
}

export type ServiceWorkerStatus = "installed" | "ready-to-update"
