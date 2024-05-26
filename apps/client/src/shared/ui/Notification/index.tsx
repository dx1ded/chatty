import { Close, type SvgIconComponent } from "@mui/icons-material"
import { Slide, Snackbar, SnackbarContent } from "@mui/material"
import { useCallback, useMemo, useState, type ReactNode } from "react"

interface NotificationProps {
  message: string
  className?: string
  Icon?: SvgIconComponent
}

const AUTO_HIDE_DURATION = 6000

export function useNotification({ message, className, Icon }: NotificationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openNotification = useCallback(() => setIsOpen(true), [])
  const closeNotification = useCallback(() => setIsOpen(false), [])

  const NotificationElement = useMemo(
    (): ReactNode => (
      <Snackbar
        open={isOpen}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}>
        <SnackbarContent
          className={`!shadow-lg ${className || ""}`}
          message={
            <span className="flex items-center gap-2">
              {Icon && <Icon sx={{ width: "1.25rem", height: "1.25rem" }} />}
              {message}
            </span>
          }
          action={[
            <button
              key="close-verify-notif"
              type="button"
              className="flex h-4 w-4 items-center"
              onClick={closeNotification}>
              <Close sx={{ width: "100%", height: "100%" }} />
            </button>,
          ]}
        />
      </Snackbar>
    ),
    [isOpen, closeNotification, message, className, Icon],
  )

  return {
    openNotification,
    NotificationElement,
  }
}
