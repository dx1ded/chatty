import type { ComponentPropsWithoutRef } from "react"

export function Text({ children, className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p {...props} className={`text-dark text-sm font-light sm:text-xs ${className || ""}`}>
      {children}
    </p>
  )
}
