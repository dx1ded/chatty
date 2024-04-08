import { useMutation } from "@apollo/client"
import {
  CameraAltOutlined,
  KeyboardVoiceOutlined,
  Send,
  SentimentSatisfiedOutlined,
} from "@mui/icons-material"
import type { CreateTextMessageMutation, CreateTextMessageMutationVariables } from "__generated__/graphql"
import { useRef } from "react"
import { Input } from "shared/ui/Input"
import { MESSAGE_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { addMessage } from "shared/slices/chat"
import { getFragment } from "__generated__"
import { SEND_TEXT_MESSAGE } from "../model/message.queries"

export function ChatFooter() {
  const { chat } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()
  const [createTextMessage] = useMutation<CreateTextMessageMutation, CreateTextMessageMutationVariables>(
    SEND_TEXT_MESSAGE,
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const sendTextMessage = async () => {
    const input = inputRef.current!

    const req = await createTextMessage({
      variables: {
        message: {
          text: input.value,
          meta: {
            chat: chat.id,
          },
        },
      },
    })

    const _fragment = req.data?.createTextMessage
    const newMessage = getFragment(MESSAGE_FIELDS, _fragment)

    if (!newMessage) return
    dispatch(addMessage(newMessage))

    input.value = ""
  }

  return (
    <footer className="mx-9 mb-6 flex items-center gap-3 rounded border border-[#E9E9E9] px-4 py-2.5">
      <button type="button" className="text-grayish h-7 w-6">
        <SentimentSatisfiedOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      <Input ref={inputRef} className="flex-1 border-none text-sm" placeholder="Write a message..." />
      <button type="button" className="text-grayish h-6 w-6">
        <CameraAltOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      <button type="button" className="text-grayish h-6 w-6">
        <KeyboardVoiceOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      <button type="button" className="text-grayish h-6 w-6">
        <Send sx={{ width: "100%", height: "100%" }} onClick={sendTextMessage} />
      </button>
    </footer>
  )
}
