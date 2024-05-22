import { useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { Input } from "shared/ui/Input"
import { handleEnter } from "shared/lib"
import { useAttachment } from "shared/ui/Attachment"
import { SendEmoji } from "./SendEmoji"
import { MessageContext } from "../model/messageContext"
import { SendPictureMessage } from "./SendPictureMessage"
import { SendVoiceMessage } from "./SendVoiceMessage"
import { useSendMessage } from "./SendMessage"
import type { MessageType } from "../lib"

export function ChatFooter() {
  const [messageType, setMessageType] = useState<MessageType>("text")
  const inputRef = useRef<HTMLInputElement>(null)
  const { items, addItem, clearItems, contextHandler } = useAttachment({
    onItemsDeleted: () => setMessageType("text"),
  })
  const { SendButton, sendTextMessage } = useSendMessage({
    messageType,
    items,
    clearItems,
  })

  const contextValue = useMemo(
    () => ({
      messageType,
      setMessageType,
      items,
      addItem,
      clearItems,
    }),
    [messageType, setMessageType, items, addItem, clearItems],
  )

  return (
    <MessageContext.Provider value={contextValue}>
      <footer className="mx-9 mb-6 flex items-center gap-3 rounded border border-[#E9E9E9] px-4 py-2.5">
        <SendEmoji input={inputRef.current} />
        <div className="flex-1">
          {contextHandler}
          {messageType === "text" && (
            <Input
              ref={inputRef}
              className="border-none text-sm"
              placeholder="Write a message..."
              onKeyDown={handleEnter(sendTextMessage(inputRef.current))}
            />
          )}
        </div>
        <SendPictureMessage />
        <SendVoiceMessage />
        {SendButton(inputRef.current)}
      </footer>
    </MessageContext.Provider>
  )
}
