import type { ComponentPropsWithoutRef } from "react"

export function Heading({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      {...props}
      className={`text-dark text-[1.75rem] font-normal sm:text-lg md:text-xl lg:text-2xl ${className || ""}`}>
      {children}
    </h2>
  )
}
