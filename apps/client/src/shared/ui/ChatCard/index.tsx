import { Done, DoneAll } from "@mui/icons-material"
import { formatChatListDate } from "shared/lib"
import { PreviewChatFieldsFragment } from "__generated__/graphql"
import { NavLink } from "react-router-dom"
import { Text } from "../Typography"

interface ChatCardProps {
  chat: PreviewChatFieldsFragment
  uid: string
  closeMenu(): void
}

export function ChatCard({ chat, uid, closeMenu }: ChatCardProps) {
  const message = chat.messages.at(-1)

  const partner = chat.members.find(({ firebaseId }) => firebaseId !== uid)!
  const sentByYou = message ? uid === message.author.firebaseId : false

  const previewMessage = message
    ? message.__typename === "TextMessage"
      ? message.text
      : message.__typename === "VoiceMessage"
        ? "Voice"
        : "Picture"
    : "No messages"

  return (
    <NavLink
      className="flex cursor-pointer items-center gap-2.5 px-5 py-3 transition-colors duration-500 hover:bg-[#F3F7FF] md:px-3 md:py-2.5 [&.active]:bg-[#F3F7FF]"
      to={`/chat/${chat.id}`}
      onClick={closeMenu}>
      <div className="relative h-10 w-10 md:h-9 md:w-9">
        <img src={partner.photoURL} alt="Avatar" className="h-full w-full rounded-full object-cover" />
        {partner.online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#00C980]" />
        )}
      </div>
      <div className="flex-1">
        <div className="mb-0.5 flex items-center justify-between sm:mb-0.5 md:mb-0">
          <Text className="font-medium">{partner.displayName}</Text>
          {message && (
            <span className="text-grayish text-xs sm:text-[0.625rem]">
              {formatChatListDate(message.timeStamp)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Text className="max-w-[17rem] truncate text-gray-400">{previewMessage}</Text>
          {message &&
            (chat.newMessagesCount ? (
              <span className="bg-secondary flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full text-[0.625rem] font-bold text-white">
                {chat.newMessagesCount}
              </span>
            ) : !sentByYou && message.read ? (
              <div />
            ) : sentByYou && !message.read ? (
              <Done className="text-cornflower-blue" sx={{ width: "1rem", height: "1rem" }} />
            ) : (
              <DoneAll className="text-cornflower-blue" sx={{ width: "1rem", height: "1rem" }} />
            ))}
        </div>
      </div>
    </NavLink>
  )
}
