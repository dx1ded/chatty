import { useState } from "react"
import { KeyboardVoiceOutlined, RadioButtonChecked } from "@mui/icons-material"
import { convertToDataUrlBase64 } from "shared/lib"
import { useMessageContext } from "../model"
import { MAX_ATTACHMENT_VOICES } from "../lib"

let chunks: Blob[] = []

export function SendVoiceMessage() {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const { messageType, setMessageType, items, addItem } = useMessageContext()

  const toggle = async () => {
    if (recorder) return recorder.stop()

    const { mediaDevices } = window.navigator
    if (!mediaDevices || !mediaDevices.getUserMedia) return

    const stream = await mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)

    setRecorder(mediaRecorder)
    setMessageType("voice")

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
      const voiceUrl = await convertToDataUrlBase64(blob)
      addItem({ type: "voice", voiceUrl })
      setRecorder(null)

      chunks = []
      mediaRecorder.ondataavailable = null
      mediaRecorder.onstop = null
    }

    mediaRecorder.start()
  }

  return (
    messageType !== "picture" &&
    items.length !== MAX_ATTACHMENT_VOICES && (
      <button
        type="button"
        className={`h-6 w-6 ${recorder ? "text-red-600" : "text-grayish"}`}
        onClick={toggle}>
        {recorder ? (
          <RadioButtonChecked sx={{ width: "100%", height: "100%" }} />
        ) : (
          <KeyboardVoiceOutlined sx={{ width: "100%", height: "100%" }} />
        )}
      </button>
    )
  )
}
