import { useState, type Dispatch, type SetStateAction } from "react"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import { SentimentSatisfiedOutlined } from "@mui/icons-material"
import { useMessageContext } from "../model"

interface SendEmojiProps {
  setInputValue: Dispatch<SetStateAction<string>>
}

export function SendEmoji({ setInputValue }: SendEmojiProps) {
  const [emojiOpen, setEmojiOpen] = useState(false)
  const { messageType } = useMessageContext()

  const clickHandler = (data: EmojiClickData) => {
    if (messageType !== "text") return
    setInputValue((prev) => prev + data.emoji)
    setEmojiOpen(false)
  }

  return (
    <div className="relative">
      <EmojiPicker
        open={emojiOpen}
        className="!absolute -left-4 -top-6 -translate-y-full"
        onEmojiClick={clickHandler}
      />
      <button type="button" className="text-grayish h-7 w-6" onClick={() => setEmojiOpen((prev) => !prev)}>
        <SentimentSatisfiedOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
    </div>
  )
}
