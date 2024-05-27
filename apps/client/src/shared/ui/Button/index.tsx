import type { ComponentPropsWithoutRef } from "react"

const buttonVariants = {
  primary:
    "bg-cornflower-blue text-white font-medium hover:bg-primary active:bg-[#73B9FF] disabled:opacity-75",
  white: "bg-white text-black hover:bg-gray-100 active:bg-gray-200 font-medium disabled:opacity-75",
  danger: "bg-red-500 hover:bg-red-400 active:bg-red-700 text-white font-medium disabled:opacity-75",
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof buttonVariants
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`rounded px-3 py-1.5 text-center text-sm transition-all duration-500 ${buttonVariants[variant]} ${className || ""}`}>
      {children}
    </button>
  )
}
