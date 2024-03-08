import {
  CameraAltOutlined,
  KeyboardVoiceOutlined,
  Send,
  SentimentSatisfiedOutlined,
} from "@mui/icons-material"
import { Input } from "shared/ui/Input"

export function ChatFooter() {
  return (
    <footer className="mx-9 mb-6 flex items-center gap-3 rounded border border-[#E9E9E9] px-4 py-2.5">
      <button type="button" className="text-grayish h-7 w-6">
        <SentimentSatisfiedOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      <Input className="flex-1 border-none text-sm" placeholder="Write a message..." />
      <button type="button" className="text-grayish h-6 w-6">
        <CameraAltOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      <button type="button" className="text-grayish h-6 w-6">
        <KeyboardVoiceOutlined sx={{ width: "100%", height: "100%" }} />
      </button>
      <button type="button" className="text-grayish h-6 w-6">
        <Send sx={{ width: "100%", height: "100%" }} />
      </button>
    </footer>
  )
}
