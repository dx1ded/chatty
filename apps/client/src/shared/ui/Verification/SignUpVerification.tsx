import { useState } from "react"
import { useAppSelector } from "../../model"
import { Button } from "../Button"
import { Title, Text } from "../Typography"
import { useVerificationContext } from "./model"

export function SignUpVerification() {
  const { user } = useAppSelector((state) => state.firebase)
  const { openVerified, openUnverified } = useVerificationContext()
  const [isLoading, setIsLoading] = useState(false)

  const checkEmailVerification = async () => {
    if (!user) return
    setIsLoading(true)
    await user.reload()
    setIsLoading(false)
    return user.emailVerified ? openVerified() : openUnverified()
  }

  return (
    <div className="flex h-[28rem] flex-col items-center justify-center p-4 text-center shadow-md sm:h-64 lg:h-80">
      <div className="text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-current bg-[#E8F7FE] text-2xl font-bold lg:mb-3 lg:h-10 lg:w-10 lg:text-xl">
        i
      </div>
      <Title className="mb-3 sm:mb-2">Verify your account</Title>
      <Text className="mb-5 max-w-72 tracking-wide sm:max-w-60">
        Verification letter with the code was sent to your e-mail
      </Text>
      <Button className="px-5" disabled={isLoading} onClick={checkEmailVerification}>
        Check
      </Button>
    </div>
  )
}
