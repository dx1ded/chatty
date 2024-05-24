import { MoreHoriz } from "@mui/icons-material"
import { Menu } from "@mui/material"
import { useRef, useState } from "react"
import { ChatInfo } from "./ChatInfo"
import { DeleteChat } from "./DeleteChat"

export function ChatOptions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={divRef}>
      <button type="button" className="text-grayish h-8 w-8" onClick={() => setIsMenuOpen((prev) => !prev)}>
        <MoreHoriz sx={{ width: "100%" }} />
      </button>
      <Menu
        open={isMenuOpen}
        anchorEl={divRef.current}
        MenuListProps={{ style: { padding: "0.25rem 0" } }}
        onClose={() => setIsMenuOpen(false)}>
        <ChatInfo />
        <DeleteChat />
      </Menu>
    </div>
  )
}
