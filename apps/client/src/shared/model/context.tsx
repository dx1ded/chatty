import { Auth, onAuthStateChanged, type User } from "firebase/auth"
import { createContext, useEffect, useState, type ReactNode, useMemo } from "react"

export interface IFirebaseContext {
  auth: Auth
  user: User | null
  isLoading: boolean
}

const defaultState: IFirebaseContext = {
  auth: {} as Auth,
  user: null,
  isLoading: true,
}

export const FirebaseContext = createContext(defaultState)

interface FirebaseProviderProps {
  children: ReactNode
  value: Omit<IFirebaseContext, "user" | "isLoading">
}

export function FirebaseProvider({ children, value }: FirebaseProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(value.auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [value.auth])

  const defaultValue = useMemo(
    () => ({
      ...value,
      user,
      isLoading,
    }),
    [value, user, isLoading],
  )

  return <FirebaseContext.Provider value={defaultValue}>{children}</FirebaseContext.Provider>
}
