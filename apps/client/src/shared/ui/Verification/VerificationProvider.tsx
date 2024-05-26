import { useMemo, type ReactNode } from "react"
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material"
import { useNotification } from "../Notification"
import { VerificationContext, type VerificationContextType } from "./model"

export function VerificationProvider({ children }: { children: ReactNode }) {
  const verified = useNotification({
    message: "Your e-mail has been verified!",
    className: "!bg-green-400",
    Icon: CheckCircleRounded,
  })
  const unverified = useNotification({
    message: "Your email is not verified!",
    className: "!bg-red-400",
    Icon: CancelRounded,
  })

  const verificationContextValue = useMemo<VerificationContextType>(
    () => ({
      openVerified: verified.openNotification,
      openUnverified: unverified.openNotification,
    }),
    [verified.openNotification, unverified.openNotification],
  )

  return (
    <VerificationContext.Provider value={verificationContextValue}>
      {verified.NotificationElement}
      {unverified.NotificationElement}
      {children}
    </VerificationContext.Provider>
  )
}
