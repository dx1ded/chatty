import { MoreHoriz } from "@mui/icons-material"
import { Text } from "shared/ui/Typography"

interface ChatHeaderProps {
  name: string
  online: boolean
}

export function ChatHeader({ name, online }: ChatHeaderProps) {
  return (
    <header className="grid h-14 flex-shrink-0 grid-cols-3 items-center border-b border-[#F7F7F7] px-4">
      <div />
      <div className="text-center">
        <Text className="font-medium leading-4">{name}</Text>
        <div className="flex items-center justify-center gap-1.5">
          <div className={`h-1.5 w-1.5 rounded-full ${online ? "bg-[#00C980]" : "bg-red-500"}`} />
          <Text className="text-grayish font-normal">{online ? "online" : "offline"}</Text>
        </div>
      </div>
      <button type="button" className="text-grayish h-10 w-10 justify-self-end">
        <MoreHoriz sx={{ width: "100%" }} />
      </button>
    </header>
  )
}
