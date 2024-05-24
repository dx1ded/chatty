import { Done, DoneAll } from "@mui/icons-material"
import { formatMessageDate, type MessageID } from "shared/lib"
import type { MessageFieldsFragment } from "__generated__/graphql"
import { useInView } from "react-intersection-observer"
import { VoiceMessage } from "./VoiceMessage"
import { PictureMessage } from "./PictureMessage"
import { TextMessage } from "./TextMessage"

interface MessageProps {
  message: MessageFieldsFragment
  uid: string
  isLatest: boolean
  readMessage: (id: MessageID) => void
}

export function Message({ message, uid, isLatest, readMessage }: MessageProps) {
  const { ref } = useInView({
    onChange(inView) {
      if (!inView || message.read) return
      readMessage(message.id)
    },
  })

  const sentByYou = message.author.firebaseId === uid

  return (
    <div
      {...(sentByYou ? {} : { ref })}
      className={`flex max-w-[30rem] items-end gap-3 ${sentByYou ? "self-end" : "self-start"}`}>
      {sentByYou ? (
        message.read ? (
          <DoneAll className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        ) : (
          <Done className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        )
      ) : (
        false
      )}
      <div className={`h-8 w-8 flex-shrink-0 ${sentByYou ? "order-12" : ""}`}>
        <img
          src={message.author.photoURL}
          alt="Profile"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div
        className={`relative rounded-[0.75rem] ${isLatest && !message.read ? "animate-slideUp" : ""} ${
          message.__typename === "TextMessage"
            ? `border p-3.5 ${
                sentByYou
                  ? `shadow-message-white rounded-br-none border-[#ECECEC] bg-white`
                  : "bg-primary border-primary shadow-message-blue rounded-bl-none"
              }`
            : ""
        }`}>
        {message.__typename === "TextMessage" ? (
          <TextMessage text={message.text} sentByYou={sentByYou} />
        ) : message.__typename === "PictureMessage" ? (
          <PictureMessage imageUrl={message.imageUrl} className="rounded-lg" />
        ) : (
          <VoiceMessage voiceUrl={message.voiceUrl} width={225} height={50} />
        )}
        <span
          className={`text-grayish absolute -bottom-6 whitespace-nowrap text-nowrap text-xs ${sentByYou ? "right-0" : "left-0"}`}>
          {formatMessageDate(message.timeStamp)}
        </span>
      </div>
    </div>
  )
}

export { PictureMessage } from "./PictureMessage"
export { VoiceMessage } from "./VoiceMessage"
