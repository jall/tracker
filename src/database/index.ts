import * as firebase from "firebase"
import {useCurrentUser} from "../auth"

export const useCurrentUserDocument = () => {
  const user = useCurrentUser()
  return firebase.firestore().collection("users").doc(user.uid)
}
