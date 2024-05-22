import type { ChangeEvent } from "react"
import { CameraAltOutlined } from "@mui/icons-material"
import { convertToDataUrlBase64 } from "shared/lib"
import { useMessageContext } from "../model"
import { MAX_ATTACHMENT_IMAGES } from "../lib"

export function SendPictureMessage() {
  const { messageType, setMessageType, items, addItem } = useMessageContext()

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const imageUrl = await convertToDataUrlBase64(e.target.files[0])
    addItem({ type: "picture", imageUrl })
    setMessageType("picture")
    e.target.value = ""
  }

  return (
    messageType !== "voice" &&
    items.length !== MAX_ATTACHMENT_IMAGES && (
      <label htmlFor="message-image" className="text-grayish block h-6 w-6 cursor-pointer">
        <input type="file" className="sr-only" accept="image/*" id="message-image" onChange={changeHandler} />
        <CameraAltOutlined sx={{ width: "100%", height: "100%" }} />
      </label>
    )
  )
}
