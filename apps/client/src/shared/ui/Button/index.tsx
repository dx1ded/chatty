import type { ComponentPropsWithoutRef } from "react"

const buttonVariants = {
  primary: "bg-cornflower-blue text-white font-medium",
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof buttonVariants
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button type="button" {...props} className={`rounded px-3 py-1.5 text-sm ${buttonVariants[variant]} ${className || ""}`}>
      {children}
    </button>
  )
}
