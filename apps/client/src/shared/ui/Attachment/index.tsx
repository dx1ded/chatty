import { Close } from "@mui/icons-material"
import { useCallback, useMemo, useState } from "react"
import { PictureMessage, VoiceMessage } from "../Message"

type AttachmentItemProps = { type: "picture"; imageUrl: string } | { type: "voice"; voiceUrl: string }

interface AttachmentProps {
  onItemsDeleted(): void
}

export function useAttachment({ onItemsDeleted }: AttachmentProps) {
  const [items, setItems] = useState<AttachmentItemProps[]>([])

  const addItem = useCallback(
    (item: AttachmentItemProps) => {
      if (
        (item.type === "picture" && items.some((item) => item.type === "voice")) ||
        (item.type === "picture" && items.length === 3) ||
        (item.type === "voice" && items.length > 0)
      )
        return

      setItems((prev) => [...prev, item])
    },
    [items],
  )

  const removeItem = useCallback(
    (i: number) => {
      setItems((prev) => prev.filter((_, index) => index !== i))
      if (items.length === 1) onItemsDeleted()
    },
    [items, onItemsDeleted],
  )

  const clearItems = useCallback(() => {
    setItems([])
    onItemsDeleted()
  }, [onItemsDeleted])

  const contextHandler = useMemo(
    () => (
      <div className="flex gap-3">
        {items.map((item, i) => (
          <div key={i} className="relative">
            <button
              type="button"
              className="absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black drop-shadow"
              onClick={() => removeItem(i)}>
              <Close sx={{ width: "70%", height: "70%" }} />
            </button>
            {item.type === "picture" ? (
              <PictureMessage imageUrl={item.imageUrl} className="max-w-24" />
            ) : (
              <VoiceMessage voiceUrl={item.voiceUrl} />
            )}
          </div>
        ))}
      </div>
    ),
    [items, removeItem],
  )

  return {
    items,
    addItem,
    clearItems,
    contextHandler,
  }
}
