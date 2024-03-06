import type { ComponentPropsWithoutRef } from "react"

export function Heading({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 {...props} className={`text-dark text-[1.75rem] font-normal ${className || ""}`}>
      {children}
    </h2>
  )
}
