import { onAuthStateChanged } from "firebase/auth"
import { useEffect, type ReactNode } from "react"
import { useAppDispatch, useAppSelector } from "shared/model"
import { setIsLoading, setUser } from "shared/slices/firebase"
import { Loader } from "shared/ui/Loader"

export function OnAuthStateChanged({ children }: { children: ReactNode }) {
  const { auth, isLoading } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser))
      dispatch(setIsLoading(false))
    })

    return unsubcribe
  }, [dispatch, auth])

  return isLoading ? <Loader /> : children
}
