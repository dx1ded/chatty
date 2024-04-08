import { Done, DoneAll } from "@mui/icons-material"
import { FragmentType, getFragment } from "__generated__"
import { MESSAGE_FIELDS } from "shared/model"
import { Text } from "../Typography"

interface MessageProps {
  data: FragmentType<typeof MESSAGE_FIELDS>
  uid: string
}

export function Message({ data, uid }: MessageProps) {
  const message = getFragment(MESSAGE_FIELDS, data)

  console.log(message)

  const sentByYou = message.author.firebaseId === uid
  const messagePreview =
    message.__typename === "TextMessage"
      ? message.text
      : message.__typename === "VoiceMessage"
        ? "Voice Message"
        : "Picture"

  return (
    <div
      className={`flex max-w-[30rem] items-end gap-3 first:mt-auto ${sentByYou ? "self-end" : "self-start"}`}>
      {sentByYou ? (
        message.read ? (
          <DoneAll className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        ) : (
          <Done className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        )
      ) : (
        false
      )}
      <div className="h-8 w-8 flex-shrink-0">
        <img
          src={message.author.photoURL}
          alt="Profile"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div
        className={`relative rounded-[0.75rem] border p-3.5 ${
          sentByYou
            ? "shadow-message-white rounded-br-none border-[#ECECEC] bg-white"
            : "bg-primary border-primary shadow-message-blue rounded-bl-none"
        }`}>
        <Text className={`font-normal ${sentByYou ? "text-dark" : "text-white"}`}>{messagePreview}</Text>
        <span className={`text-grayish absolute -bottom-6 text-xs ${sentByYou ? "right-0" : "left-0"}`}>
          Yesterday, 11:25 AM
        </span>
      </div>
    </div>
  )
}
