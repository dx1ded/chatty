import { Done, DoneAll } from "@mui/icons-material"
import { MessageFieldsFragment } from "graphql/graphql"
import { Text } from "../Typography"

interface MessageProps {
  data: MessageFieldsFragment
  uid: string
}

export function Message({ data, uid }: MessageProps) {
  const sentByYou = data.author.firebaseId === uid
  const messagePreview =
    data.__typename === "TextMessage"
      ? data.text
      : data.__typename === "VoiceMessage"
        ? "Voice Message"
        : "Picture"

  return (
    <div
      className={`flex max-w-[30rem] items-end gap-3 first:mt-auto ${sentByYou ? "self-end" : "self-start"}`}>
      {sentByYou ? (
        data.read ? (
          <DoneAll className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        ) : (
          <Done className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        )
      ) : (
        false
      )}
      <div className="h-8 w-8 flex-shrink-0">
        <img src={data.author.photoURL} alt="Profile" className="h-full w-full rounded-full object-cover" />
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
