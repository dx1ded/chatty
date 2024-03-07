import { useContext } from "react"
import { FirebaseContext } from "./context"

export function useAuth() {
  const { auth } = useContext(FirebaseContext)

  return auth
}
