import { useState } from "react"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import { SentimentSatisfiedOutlined } from "@mui/icons-material"

interface SendEmojiProps {
  input: HTMLInputElement | null
}

export function SendEmoji({ input }: SendEmojiProps) {
  const [emojiOpen, setEmojiOpen] = useState(false)

  const clickHandler = (data: EmojiClickData) => {
    if (!input) return
    input.value += data.emoji
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
