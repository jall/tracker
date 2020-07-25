import * as firebase from "firebase/app"
import {useAuthState} from "react-firebase-hooks/auth"

export const useAuth = () => {
  return useAuthState(firebase.auth())
}

// Only intended for use after login
export const useCurrentUser = () => {
  const [user] = useAuth()

  if (!user) {
    throw new Error("User not found")
  }

  return user
}
