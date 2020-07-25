import React, {useState} from "react"
import {createStubAims, notNothing} from "../../helpers"
import MainContent from "../components/MainContent"
import {Aim} from "../types"

export default function AimsPage() {
  const [aims, setAims] = useState(
    createStubAims().reduce((acc, aim) => {
      acc[aim.id] = aim
      return acc
    }, {} as Record<string, Aim | undefined>),
  )
  return (
    <MainContent
      aims={Object.values(aims).filter(notNothing)}
      upsert={(aim) =>
        setAims({
          ...aims,
          [aim.id]: {
            ...aim,
            efforts: "efforts" in aim ? aim.efforts : [],
          },
        })
      }
      remove={(id) => setAims({...aims, [id]: undefined})}
    />
  )
}
