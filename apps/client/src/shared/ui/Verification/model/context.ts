import { createContext, useContext } from "react"

export type VerificationContextType = {
  openVerified(): void
  openUnverified(): void
}

const initialState: VerificationContextType = {
  openVerified() {},
  openUnverified() {},
}

export const VerificationContext = createContext<VerificationContextType>(initialState)

export const useVerificationContext = () => {
  return useContext(VerificationContext)
}
