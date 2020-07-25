import * as firebase from "firebase/app"
import {useState, useEffect} from "react"

export const useAuth = () => {
  const [auth, setAuth] = useState<
    "unchecked" | "authenticated" | "unauthenticated"
  >("unchecked")

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAuth(user === null ? "unauthenticated" : "authenticated")
    })
  }, [setAuth])

  return auth
}

// Only intended for use after login
export const useLoggedInUser = () => {
  const [user, setUser] = useState<firebase.User | null>(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser)
  }, [user, setUser])

  if (!user) {
    throw new Error("User not found")
  }

  return user
}
