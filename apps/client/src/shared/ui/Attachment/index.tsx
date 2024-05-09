import { Close } from "@mui/icons-material"
import { useCallback, useMemo, useState } from "react"
import { PictureMessage, VoiceMessage } from "../Message"

type AttachmentItemProps = { type: "picture" | "voice"; blob: Blob }

export function useAttachment() {
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

  const removeItem = useCallback((i: number) => {
    setItems((prev) => prev.filter((_, index) => index !== i))
  }, [])

  const contextHandler = useMemo(
    () => (
      <div className="flex gap-2">
        {items.map((item, i) => (
          <div key={i} className="relative">
            <button
              type="button"
              className="absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black drop-shadow"
              onClick={() => removeItem(i)}>
              <Close sx={{ width: "70%", height: "70%" }} />
            </button>
            {item.type === "picture" ? (
              <PictureMessage blob={item.blob} />
            ) : (
              <VoiceMessage blob={item.blob} />
            )}
          </div>
        ))}
      </div>
    ),
    [items, removeItem],
  )

  return {
    addItem,
    removeItem,
    contextHandler,
  }
}
