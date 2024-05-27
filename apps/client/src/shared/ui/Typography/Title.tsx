import type { ComponentPropsWithoutRef } from "react"

export function Title({ children, className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      {...props}
      className={`text-dark text-[1.375rem] font-normal md:text-lg lg:text-xl ${className || ""}`}>
      {children}
    </h3>
  )
}
