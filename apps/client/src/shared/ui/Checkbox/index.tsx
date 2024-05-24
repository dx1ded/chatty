import { Done } from "@mui/icons-material"
import type { ComponentPropsWithoutRef } from "react"

export function Checkbox({ className, id, ...attrs }: ComponentPropsWithoutRef<"input">) {
  return (
    <label htmlFor={id} className={`flex h-5 w-5 cursor-pointer items-center ${className || ""}`}>
      <input type="checkbox" className="peer sr-only" id={id} {...attrs} />
      <span className="border-cornflower-blue peer-checked:bg-cornflower-blue flex h-full w-full items-center justify-center rounded-full border bg-white text-white transition">
        <Done sx={{ width: "80%", height: "80%" }} />
      </span>
    </label>
  )
}
