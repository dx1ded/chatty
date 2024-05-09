import { PlayCircle } from "@mui/icons-material"
import { useMemo, useState } from "react"
import { AudioVisualizer } from "react-audio-visualize"

interface VoiceMessageProps {
  blob: Blob
}

export function VoiceMessage({ blob }: VoiceMessageProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const audio = useMemo(() => new Audio(window.URL.createObjectURL(blob)), [blob])

  const clickHandler = () => {
    if (!audio.paused && audio.currentTime > 0 && !audio.ended) {
      return audio.pause()
    }

    audio.play()
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
    audio.onended = () => {
      setCurrentTime(0)
      audio.currentTime = 0
      audio.ontimeupdate = null
      audio.onended = null
    }
  }

  return (
    <div className="bg-primary relative flex items-center gap-2 rounded-xl border border-gray-200 p-2">
      <button
        type="button"
        className="flex h-7 w-7 items-center justify-center text-white"
        onClick={clickHandler}>
        <PlayCircle sx={{ width: "100%", height: "100%" }} />
      </button>
      <AudioVisualizer
        blob={blob}
        currentTime={currentTime}
        width={180}
        height={35}
        barWidth={3}
        gap={2}
        barPlayedColor="rgba(255, 255, 255, 0.7)"
        barColor="rgb(255, 255, 255)"
      />
      {/* <audio controls src={window.URL.createObjectURL(blob)} /> */}
    </div>
  )
}
