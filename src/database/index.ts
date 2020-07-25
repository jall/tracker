import React, {useContext} from "react"

export const DatabaseContext = React.createContext<
  firebase.firestore.Firestore | undefined
>(undefined)

export const useDatabase = () => {
  const database = useContext(DatabaseContext)
  if (!database) {
    throw new Error("Database not initialised")
  }
  return database
}
