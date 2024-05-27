import { CancelRounded } from "@mui/icons-material"
import { useState } from "react"
import { useAppSelector } from "../../model"
import { Button } from "../Button"
import { Text } from "../Typography"
import { useVerificationContext } from "./model"

export function VerificationBar() {
  const { user } = useAppSelector((state) => state.firebase)
  const { openVerified, openUnverified } = useVerificationContext()
  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const checkEmailVerification = async () => {
    if (!user) return
    setIsLoading(true)
    await user.reload()
    setIsLoading(false)
    return user.emailVerified ? openVerified() : openUnverified()
  }

  return (
    isOpen &&
    !user?.emailVerified && (
      <div className="fixed left-0 top-0 z-50 flex h-12 w-full items-center gap-4 border-b bg-yellow-500 px-4 py-2 shadow-md">
        <Text className="text-white">
          Your e-mail is not verified yet. Please follow the link that was sent to the provided e-mail
        </Text>
        <Button className="ml-auto !py-1 px-2.5" disabled={isLoading} onClick={checkEmailVerification}>
          Check
        </Button>
        <button
          type="button"
          className="flex h-5 w-5 items-center text-white"
          onClick={() => setIsOpen(false)}>
          <CancelRounded sx={{ width: "100%", height: "100%" }} />
        </button>
      </div>
    )
  )
}
