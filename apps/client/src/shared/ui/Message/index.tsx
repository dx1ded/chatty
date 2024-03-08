import { Done, DoneAll } from "@mui/icons-material"
import { Text } from "../Typography"

interface MessageProps {
  data: {
    text: string
    timeStamp: number
    profilePhotoURL: string
    isRead?: boolean
    sentByYou: boolean
  }
}

export function Message({ data }: MessageProps) {
  return (
    <div
      className={`flex max-w-[30rem] items-end gap-3 first:mt-auto ${data.sentByYou ? "self-end" : "self-start"}`}>
      {data.sentByYou ? (
        data.isRead ? (
          <DoneAll className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        ) : (
          <Done className="text-cornflower-blue" sx={{ width: "1.1rem", height: "1.1rem" }} />
        )
      ) : (
        false
      )}
      <div className="h-8 w-8 flex-shrink-0">
        <img src={data.profilePhotoURL} alt="Profile" className="h-full w-full rounded-full object-cover" />
      </div>
      <div
        className={`relative rounded-[0.75rem] border p-3.5 ${data.sentByYou ? "shadow-message-white rounded-br-none border-[#ECECEC] bg-white" : "bg-primary border-primary shadow-message-blue rounded-bl-none"}`}>
        <Text className={`font-normal ${data.sentByYou ? "text-dark" : "text-white"}`}>{data.text}</Text>
        <span className={`text-grayish absolute -bottom-6 text-xs ${data.sentByYou ? "right-0" : "left-0"}`}>
          Yesterday, 11:25 AM
        </span>
      </div>
    </div>
  )
}
