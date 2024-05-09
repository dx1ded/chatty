import { useRef, useState, type Dispatch, type SetStateAction } from "react"
import { useMutation } from "@apollo/client"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react"
import {
  CameraAltOutlined,
  KeyboardVoiceOutlined,
  RadioButtonChecked,
  Send,
  SentimentSatisfiedOutlined,
} from "@mui/icons-material"
import type { CreateTextMessageMutation, CreateTextMessageMutationVariables } from "__generated__/graphql"
import { Input } from "shared/ui/Input"
import { useAppSelector } from "shared/model"
import { handleEnter } from "shared/lib"
import { Spinner } from "shared/ui/Spinner"
import { useAttachment } from "shared/ui/Attachment"
import { SEND_TEXT_MESSAGE } from "../model/message.queries"

interface ChatFooterProps {
  setOffset: Dispatch<SetStateAction<number>>
}

let chunks: Blob[] = []

export function ChatFooter({ setOffset }: ChatFooterProps) {
  const { chat } = useAppSelector((state) => state.chat)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [messageType, setMessageType] = useState<"text" | "picture" | "voice">("text")
  const inputRef = useRef<HTMLInputElement>(null)
  const { addItem, contextHandler } = useAttachment()

  const [createTextMessage, { loading }] = useMutation<
    CreateTextMessageMutation,
    CreateTextMessageMutationVariables
  >(SEND_TEXT_MESSAGE)

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

  const toggleVoiceMessage = async () => {
    if (recorder) return recorder.stop()

    const { mediaDevices } = window.navigator
    if (!mediaDevices || !mediaDevices.getUserMedia) return

    const stream = await mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)

    setRecorder(mediaRecorder)
    setMessageType("voice")

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
      addItem({ type: "voice", blob })
      setRecorder(null)

      chunks = []
      mediaRecorder.ondataavailable = null
      mediaRecorder.onstop = null
    }

    mediaRecorder.start()
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
      <div className="flex-1">
        {contextHandler}
        {messageType === "text" && (
          <Input
            ref={inputRef}
            className="border-none text-sm"
            placeholder="Write a message..."
            onKeyDown={handleEnter(sendTextMessage)}
          />
        )}
      </div>
      {(messageType === "text" || messageType === "picture") && (
        <button type="button" className="text-grayish h-6 w-6">
          <CameraAltOutlined sx={{ width: "100%", height: "100%" }} />
        </button>
      )}
      {(messageType === "text" || messageType === "voice") && (
        <button
          type="button"
          className={`h-6 w-6 ${recorder ? "text-red-600" : "text-grayish"}`}
          onClick={toggleVoiceMessage}>
          {recorder ? (
            <RadioButtonChecked sx={{ width: "100%", height: "100%" }} />
          ) : (
            <KeyboardVoiceOutlined sx={{ width: "100%", height: "100%" }} />
          )}
        </button>
      )}
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
