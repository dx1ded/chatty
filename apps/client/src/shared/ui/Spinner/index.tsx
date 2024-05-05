import { forwardRef, type ComponentPropsWithoutRef } from "react"
import "./index.css"

const types = {
  iphone: "iphone-spinner",
  round: "round-spinner",
}

interface SpinnerProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Size in rem
   */
  size?: number
  /**
   * Spinner type
   */
  type?: keyof typeof types
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { size = 2, type = "iphone", className, ...props }: SpinnerProps,
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      className={`${types[type]} ${className || ""}`}
      style={{ width: `${size}rem` }}
    />
  )
})
