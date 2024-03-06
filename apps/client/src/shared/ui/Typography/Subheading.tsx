import type { ComponentPropsWithoutRef } from "react"

export function Subheading({ children, className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p {...props} className={`text-dark text-lg font-light ${className || ""}`}>
      {children}
    </p>
  )
}
