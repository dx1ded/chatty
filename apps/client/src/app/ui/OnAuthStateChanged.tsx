import { useEffect, type ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "shared/model"
import { setIsLoading, setUser } from "shared/slices/firebase"
import { Loader } from "shared/ui/Loader"

export function OnAuthStateChanged({ children }: { children: ReactNode }) {
  const { auth, isLoading } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubcribe = auth.onIdTokenChanged((currentUser) => {
      /*
        Using setUser(null) because there's a really weird problem
        @rtk uses cache by default and setting setUser(currentUser) is not gonna change anything (even when currentUser.emailVerified is changed)
        ... because currentUser has the same memory id. At the same time, I can't do {...currentUser} because firebase has sort of context on this object
        That's why, I use setUser(null) and then setUser(currentUser)
      */
      dispatch(setUser(null))
      dispatch(setUser(currentUser))
      dispatch(setIsLoading(false))
    })

    return unsubcribe
  }, [dispatch, auth])

  return isLoading ? <Loader /> : children
}
