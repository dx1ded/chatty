import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import { useMutation } from "@apollo/client"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import {
  CameraAltOutlined,
  KeyboardVoiceOutlined,
  Send,
  SentimentSatisfiedOutlined,
} from "@mui/icons-material"
import type { CreateTextMessageMutation, CreateTextMessageMutationVariables } from "__generated__/graphql"
import { Input } from "shared/ui/Input"
import { useAppSelector } from "shared/model"
import { handleEnter } from "shared/lib"
import { Spinner } from "shared/ui/Spinner"
import { SEND_TEXT_MESSAGE } from "../model/message.queries"

interface ChatFooterProps {
  setOffset: Dispatch<SetStateAction<number>>
}

export function ChatFooter({ setOffset }: ChatFooterProps) {
  const { chat } = useAppSelector((state) => state.chat)
  const [createTextMessage, { loading }] = useMutation<
    CreateTextMessageMutation,
    CreateTextMessageMutationVariables
  >(SEND_TEXT_MESSAGE)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sendTextMessage = async () => {
    const input = inputRef.current!
    if (!input.value) return

    await createTextMessage({
      variables: {
        message: {
          text: input.value,
          meta: {
            chat: chat.id,
          },
        },
      },
    })

    setOffset((prev) => prev + 1)
    input.value = ""
  }

  const emojiClickHandler = (data: EmojiClickData) => {
    inputRef.current!.value += data.emoji
    setEmojiOpen(false)
  }

  return (
    <footer className="mx-9 mb-6 flex items-center gap-3 rounded border border-[#E9E9E9] px-4 py-2.5">
      <div className="relative">
        <EmojiPicker
          open={emojiOpen}
          className="!absolute -left-4 -top-6 -translate-y-full"
          onEmojiClick={emojiClickHandler}
        />
        <button type="button" className="text-grayish h-7 w-6" onClick={() => setEmojiOpen((prev) => !prev)}>
          <SentimentSatisfiedOutlined sx={{ width: "100%", height: "100%" }} />
        </button>
      </div>
      <Input
        ref={inputRef}
        className="border-none text-sm"
        containerClassName="flex-1"
        placeholder="Write a message..."
        onKeyDown={handleEnter(sendTextMessage)}
      />
      <button type="button" className="text-grayish h-6 w-6">
        <CameraAltOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      <button type="button" className="text-grayish h-6 w-6">
        <KeyboardVoiceOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      {loading ? (
        <Spinner type="round" size={1.5} />
      ) : (
        <button type="button" className="text-grayish h-6 w-6">
          <Send sx={{ width: "100%", height: "100%" }} onClick={sendTextMessage} />
        </button>
      )}
    </footer>
  )
}
