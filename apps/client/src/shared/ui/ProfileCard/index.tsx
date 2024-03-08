import { Done, DoneAll } from "@mui/icons-material"
import { formatDate } from "shared/lib"
import { Text } from "../Typography"

interface ProfileCardProps {
  data: {
    profileURL: string
    fullName: string
    sentAt: number
    sentByYou: boolean
    online: boolean
    lastMessage: string
    lastMessageRead: boolean
    newMessages?: number
  }
}

export function ProfileCard({ data }: ProfileCardProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2.5 px-5 py-3 transition-colors duration-500 hover:bg-[#F3F7FF]">
      <div className="relative h-10 w-10">
        <img src={data.profileURL} alt="Avatar" className="h-full w-full rounded-full object-cover" />
        {data.online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#00C980]" />
        )}
      </div>
      <div className="flex-1">
        <div className="mb-0.5 flex items-center justify-between">
          <Text className="font-medium">{data.fullName}</Text>
          <span className="text-grayish text-xs">{formatDate(data.sentAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <Text className="max-w-[17rem] truncate text-gray-400">{data.lastMessage}</Text>
          {data.newMessages ? (
            <span className="bg-secondary flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full text-[0.625rem] font-bold text-white">
              {data.newMessages}
            </span>
          ) : !data.sentByYou && data.lastMessageRead ? (
            <div />
          ) : data.sentByYou && !data.lastMessageRead ? (
            <Done className="text-cornflower-blue" sx={{ width: "1rem", height: "1rem" }} />
          ) : (
            <DoneAll className="text-cornflower-blue" sx={{ width: "1rem", height: "1rem" }} />
          )}
        </div>
      </div>
    </div>
  )
}
