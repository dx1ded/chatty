import { Auth } from "firebase/auth"
import { createContext } from "react"

export interface IFirebaseContext {
  auth: Auth
}

const defaultState: IFirebaseContext = {
  auth: {} as Auth,
}

export const FirebaseContext = createContext(defaultState)
