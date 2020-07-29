import {useCollectionData} from "react-firebase-hooks/firestore"
import {useCurrentUserDocument} from "../database"
import {Aim, Effort} from "./types"

export const useAimsCollection = () => {
  const userDoc = useCurrentUserDocument()
  return userDoc.collection("aims") as firebase.firestore.CollectionReference<
    Aim
  >
}

export const useAims = () => {
  const collection = useAimsCollection()
  return useCollectionData<Aim>(collection.orderBy("createdAt", "desc"), {
    idField: "id",
  })
}

export const useAimDoc = (aimId: string) => {
  const aimsCollection = useAimsCollection()
  return aimsCollection.doc(aimId)
}

export const useEffortsCollection = (aimId: string) => {
  const aimDoc = useAimDoc(aimId)
  return aimDoc.collection("efforts") as firebase.firestore.CollectionReference<
    Effort
  >
}

export const useEfforts = (aimId: string) => {
  const collection = useEffortsCollection(aimId)
  return useCollectionData<Effort>(collection.orderBy("achievedAt", "desc"), {
    idField: "id",
  })
}

export const useEffortDoc = (aimId: string, effortId: string) => {
  const effortsCollection = useEffortsCollection(aimId)
  return effortsCollection.doc(effortId)
}
