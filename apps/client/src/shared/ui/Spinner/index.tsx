import type { ComponentPropsWithoutRef } from "react"
import "./index.css"

interface SpinnerProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Size in rem
   */
  size?: number
}

export function Spinner({ size = 2, className, ...props }: SpinnerProps) {
  return <div {...props} className={`loader ${className || ""}`} style={{ width: `${size}rem` }} />
}
