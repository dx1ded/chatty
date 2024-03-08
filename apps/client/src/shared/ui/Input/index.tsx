import { Done, Close } from "@mui/icons-material"
import { forwardRef, type ComponentPropsWithoutRef } from "react"
import { Spinner } from "../Spinner"

const inputVariants = {
  primary: "bg-white text-dark border-[#DDDDDD] placeholder:text-grayish",
  secondary: "bg-[#F7F8F9] text-dark border-[#F7F8F9]",
}

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  variant?: keyof typeof inputVariants
  /**
   * Adds extra green-tick or a red-cross depending on the value
   */
  isCorrect?: boolean
  /**
   * Adds spinning wheel while isLoading
   */
  isLoading?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant = "primary", isCorrect, isLoading, ...props }: InputProps,
  ref,
) {
  const inputClassName = `rounded w-full border outline-none ${inputVariants[variant]} ${className || ""}`

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2">
          <Spinner size={1} />
        </div>
        <input ref={ref} type="text" {...props} disabled className={inputClassName} />
      </div>
    )
  }

  if (typeof isCorrect !== "undefined") {
    const ExtrasIcon = isCorrect ? Done : Close
    const extrasClassName = isCorrect ? "bg-green-500" : "bg-red-500"

    return (
      <div className="relative">
        <div
          className={`absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full text-white ${extrasClassName}`}>
          <ExtrasIcon sx={{ width: "0.75rem" }} />
        </div>
        <input
          ref={ref}
          type="text"
          {...props}
          className={`${inputClassName} ${!isCorrect ? "border-red-500" : ""}`}
        />
      </div>
    )
  }

  return <input ref={ref} type="text" {...props} className={inputClassName} />
})
