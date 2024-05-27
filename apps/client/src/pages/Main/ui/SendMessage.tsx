import { useCallback, useMemo, type Dispatch, type SetStateAction } from "react"
import type {
  CreatePictureMessageMutation,
  CreatePictureMessageMutationVariables,
  CreateTextMessageMutation,
  CreateTextMessageMutationVariables,
  CreateVoiceMessageMutation,
  CreateVoiceMessageMutationVariables,
} from "__generated__/graphql"
import { useMutation } from "@apollo/client"
import { useAppSelector } from "shared/model"
import { Spinner } from "shared/ui/Spinner"
import { Send } from "@mui/icons-material"
import type { useAttachment } from "shared/ui/Attachment"
import { SEND_PICTURE_MESSAGE, SEND_TEXT_MESSAGE, SEND_VOICE_MESSAGE } from "../model/queries/message"
import type { MessageType } from "../lib"

interface UseSendMessageProps {
  messageType: MessageType
  items: ReturnType<typeof useAttachment>["items"]
  clearItems: ReturnType<typeof useAttachment>["clearItems"]
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
}

export function useSendMessage({
  messageType,
  items,
  clearItems,
  inputValue,
  setInputValue,
}: UseSendMessageProps) {
  const { chat } = useAppSelector((state) => state.chat)

  const [createTextMessage, { loading: textLoading }] = useMutation<
    CreateTextMessageMutation,
    CreateTextMessageMutationVariables
  >(SEND_TEXT_MESSAGE)

  const [createPictureMessage, { loading: pictureLoading }] = useMutation<
    CreatePictureMessageMutation,
    CreatePictureMessageMutationVariables
  >(SEND_PICTURE_MESSAGE)

  const [createVoiceMessage, { loading: voiceLoading }] = useMutation<
    CreateVoiceMessageMutation,
    CreateVoiceMessageMutationVariables
  >(SEND_VOICE_MESSAGE)

  const sendTextMessage = useCallback(async () => {
    if (!inputValue) return

    await createTextMessage({
      variables: {
        message: {
          text: inputValue,
          meta: {
            chat: chat.id,
          },
        },
      },
    })

    setInputValue("")
  }, [chat.id, createTextMessage, inputValue, setInputValue])

  const sendPictureMessage = useCallback(async () => {
    const pictureItems = items.filter(
      (item): item is { type: "picture"; imageUrl: string } => item.type === "picture",
    )

    await createPictureMessage({
      variables: {
        message: {
          // item.imageUrl doesn't exist // vscode error
          imagesUrl: pictureItems.map((item) => item.imageUrl),
          meta: {
            chat: chat.id,
          },
        },
      },
    })

    clearItems()
    // There's no setMessageType("text") because useAttachment does it after clearItems() - it calls onItemsDeleted()
  }, [chat.id, createPictureMessage, items, clearItems])

  const sendVoiceMessage = useCallback(async () => {
    if (items[0].type !== "voice") return

    await createVoiceMessage({
      variables: {
        message: {
          voiceUrl: items[0].voiceUrl,
          meta: {
            chat: chat.id,
          },
        },
      },
    })

    clearItems()
    // There's no setMessageType("text") because useAttachment does it after clearItems() - it calls onItemsDeleted()
  }, [chat.id, createVoiceMessage, items, clearItems])

  const SendButton = useMemo(
    () =>
      textLoading || pictureLoading || voiceLoading ? (
        <Spinner type="round" size={1.5} />
      ) : (
        <button
          type="button"
          className="text-grayish h-6 w-6"
          onClick={
            messageType === "text"
              ? sendTextMessage
              : messageType === "picture"
                ? sendPictureMessage
                : sendVoiceMessage
          }>
          <Send sx={{ width: "100%", height: "100%" }} />
        </button>
      ),
    [
      textLoading,
      pictureLoading,
      voiceLoading,
      messageType,
      sendTextMessage,
      sendPictureMessage,
      sendVoiceMessage,
    ],
  )

  return {
    SendButton,
    sendTextMessage,
  }
}
