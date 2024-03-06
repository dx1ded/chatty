import type { ComponentPropsWithoutRef } from "react"

const inputVariants = {
  primary: "bg-white text-dark border-grayish placeholder:text-grayish",
  secondary: "bg-[#F7F8F9] text-dark border-[#F7F8F9]",
}

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  variant?: keyof typeof inputVariants
  /**
   * Adds extra green-tick or a red-cross depending on the value
   */
  isCorrect?: boolean
}

export function Input({ className, variant = "primary", isCorrect, ...props }: InputProps) {
  const extras = [typeof isCorrect === "boolean" ? (isCorrect ? "bg-red-500" : "bg-green-500") : ""]

  if (extras[0]) {
    extras.push("absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8")
  }

  return <input type="text" {...props} className={`relative ${inputVariants[variant]} ${extras.join(" ")} ${className || ""}`} />
}
