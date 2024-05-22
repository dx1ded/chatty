import { PlayCircle, StopCircle } from "@mui/icons-material"
import { useEffect, useMemo, useState } from "react"
import { AudioVisualizer } from "react-audio-visualize"
import { base64ToBlob, dataURLToBase64 } from "shared/lib"

interface VoiceMessageProps {
  voiceUrl: string
  /**
   * In px
   */
  width?: number
  /**
   * In px
   */
  height?: number
}

const DEFAULT_WIDTH = 180
const DEFAULT_HEIGHT = 35

export function VoiceMessage({ voiceUrl, width, height }: VoiceMessageProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [blob, setBlob] = useState<Blob | null>(null)
  const audio = useMemo(() => new Audio(voiceUrl), [voiceUrl])

  useEffect(() => {
    setBlob(base64ToBlob(dataURLToBase64(voiceUrl), "audio/ogg; codecs=opus"))
  }, [voiceUrl])

  const clickHandler = () => {
    if (!audio.paused && audio.currentTime > 0 && !audio.ended) {
      setPlaying(false)
      return audio.pause()
    }

    setPlaying(true)
    audio.play()
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime)
    audio.onended = () => {
      setCurrentTime(0)
      setPlaying(false)
      audio.currentTime = 0
      audio.ontimeupdate = null
      audio.onended = null
    }
  }

  const VoiceIcon = playing ? StopCircle : PlayCircle

  return (
    <div className="bg-primary relative flex items-center gap-2 rounded-xl border border-gray-200 p-2">
      <button
        type="button"
        className="flex h-7 w-7 items-center justify-center text-white"
        onClick={clickHandler}>
        <VoiceIcon sx={{ width: "100%", height: "100%" }} />
      </button>
      {blob && (
        <AudioVisualizer
          blob={blob}
          currentTime={currentTime}
          width={width || DEFAULT_WIDTH}
          height={height || DEFAULT_HEIGHT}
          barWidth={3}
          gap={2}
          barPlayedColor="rgba(255, 255, 255, 0.7)"
          barColor="rgb(255, 255, 255)"
        />
      )}
    </div>
  )
}
