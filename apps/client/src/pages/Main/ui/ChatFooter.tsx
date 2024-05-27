import { useMemo, useState } from "react"
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
  // Using useState instead of useRef because it has to rerender the component when changed
  const [inputValue, setInputValue] = useState("")
  const { items, addItem, clearItems, contextHandler } = useAttachment({
    onItemsDeleted: () => setMessageType("text"),
  })
  const { SendButton, sendTextMessage } = useSendMessage({
    messageType,
    items,
    clearItems,
    inputValue,
    setInputValue,
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
        <SendEmoji setInputValue={setInputValue} />
        <div className="flex-1">
          {contextHandler}
          {messageType === "text" && (
            <Input
              className="border-none text-sm"
              placeholder="Write a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleEnter(sendTextMessage)}
            />
          )}
        </div>
        <SendPictureMessage />
        <SendVoiceMessage />
        {SendButton}
      </footer>
    </MessageContext.Provider>
  )
}
