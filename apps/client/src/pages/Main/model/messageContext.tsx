import { createContext, useContext, type Dispatch, type SetStateAction } from "react"
import type { useAttachment } from "shared/ui/Attachment"
import type { MessageType } from "../lib"

interface MessageContextProps {
  messageType: MessageType
  setMessageType: Dispatch<SetStateAction<MessageType>>
  items: ReturnType<typeof useAttachment>["items"]
  addItem: ReturnType<typeof useAttachment>["addItem"]
  clearItems: ReturnType<typeof useAttachment>["clearItems"]
}

const initialState: MessageContextProps = {
  messageType: "text",
  items: [],
  setMessageType() {},
  addItem() {},
  clearItems() {},
}

export const MessageContext = createContext<MessageContextProps>(initialState)

export function useMessageContext() {
  return useContext(MessageContext)
}
