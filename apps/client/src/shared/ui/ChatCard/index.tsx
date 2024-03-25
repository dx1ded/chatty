import { Done, DoneAll } from "@mui/icons-material"
import { formatDate } from "shared/lib"
import { ChatFieldsFragment } from "graphql/graphql"
import { Text } from "../Typography"

interface ChatCardProps {
  chat: ChatFieldsFragment
  uid: string
}

export function ChatCard({ chat, uid }: ChatCardProps) {
  const message = chat.messages[0]!
  const sentByYou = uid === message.author.firebaseId

  const previewMessage =
    message.__typename === "TextMessage"
      ? message.text
      : message.__typename === "VoiceMessage"
        ? "Voice"
        : "Picture"

  const unreadMessagesCount = chat.messages.reduce((acc, msg) => {
    if (!msg?.read) {
      acc += 1
    }

    return acc
  }, 0)

  return (
    <div className="flex cursor-pointer items-center gap-2.5 px-5 py-3 transition-colors duration-500 hover:bg-[#F3F7FF]">
      <div className="relative h-10 w-10">
        <img src={message.author.photoURL} alt="Avatar" className="h-full w-full rounded-full object-cover" />
        {message.author.online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#00C980]" />
        )}
      </div>
      <div className="flex-1">
        <div className="mb-0.5 flex items-center justify-between">
          <Text className="font-medium">{message.author.displayName}</Text>
          <span className="text-grayish text-xs">{formatDate(message.timeStamp)}</span>
        </div>
        <div className="flex items-center justify-between">
          <Text className="max-w-[17rem] truncate text-gray-400">{previewMessage}</Text>
          {unreadMessagesCount ? (
            <span className="bg-secondary flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full text-[0.625rem] font-bold text-white">
              {unreadMessagesCount}
            </span>
          ) : !sentByYou && message.read ? (
            <div />
          ) : sentByYou && !message.read ? (
            <Done className="text-cornflower-blue" sx={{ width: "1rem", height: "1rem" }} />
          ) : (
            <DoneAll className="text-cornflower-blue" sx={{ width: "1rem", height: "1rem" }} />
          )}
        </div>
      </div>
    </div>
  )
}
