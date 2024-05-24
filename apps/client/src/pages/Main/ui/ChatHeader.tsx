import { ArrowBack } from "@mui/icons-material"
import { Link } from "react-router-dom"
import { Text } from "shared/ui/Typography"
import { ChatOptions } from "./ChatOptions"

interface ChatHeaderProps {
  name: string
  online: boolean
}

export function ChatHeader({ name, online }: ChatHeaderProps) {
  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-[#F7F7F7] px-4">
      <Link to="/" className="flex h-8 w-8 items-center text-gray-500">
        <ArrowBack sx={{ width: "100%" }} />
      </Link>
      <div className="text-center">
        <Text className="font-medium leading-4">{name}</Text>
        <div className="flex items-center justify-center gap-1.5">
          <div className={`h-1.5 w-1.5 rounded-full ${online ? "bg-[#00C980]" : "bg-red-500"}`} />
          <Text className="text-grayish font-normal">{online ? "online" : "offline"}</Text>
        </div>
      </div>
      <ChatOptions />
    </header>
  )
}
