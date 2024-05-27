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
  /**
   * Container class name
   */
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, containerClassName, variant = "primary", isCorrect, isLoading, ...props }: InputProps,
  ref,
) {
  const inputClassName = `rounded w-full border outline-none lg:text-sm sm:text-xs ${inputVariants[variant]} ${className || ""}`
  const isCorrectSet = typeof isCorrect !== "undefined"
  const ExtrasIcon = isCorrect ? Done : Close
  const extrasClassName = isCorrect ? "bg-green-500" : "bg-red-500"

  return (
    <div className={`relative ${containerClassName || ""}`}>
      <div
        className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 ${isCorrectSet ? `flex items-center justify-center rounded-full text-white ${extrasClassName}` : ""}`}>
        {isLoading ? <Spinner size={1} /> : isCorrectSet ? <ExtrasIcon sx={{ width: "0.75rem" }} /> : false}
      </div>
      <input
        ref={ref}
        {...props}
        className={`${inputClassName} ${!isCorrect && isCorrectSet ? "border-red-500" : ""}`}
      />
    </div>
  )
})
