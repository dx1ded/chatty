import { Delete, Info, MoreHoriz } from "@mui/icons-material"
import { Menu, MenuItem } from "@mui/material"
import { useRef, useState } from "react"
import { useChatInfo } from "./ChatInfo"
import { useDeleteChat } from "./DeleteChat"

export function ChatOptions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const { ChatInfoModal, openChatInfoModal } = useChatInfo()
  const { DeleteChatDialog, openDeleteChatDialog } = useDeleteChat()

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div ref={divRef}>
      <button type="button" className="text-grayish h-8 w-8" onClick={() => setIsMenuOpen((prev) => !prev)}>
        <MoreHoriz sx={{ width: "100%" }} />
      </button>
      {ChatInfoModal}
      {DeleteChatDialog}
      <Menu
        open={isMenuOpen}
        anchorEl={divRef.current}
        slotProps={{ paper: { sx: { boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)" } } }}
        MenuListProps={{ style: { padding: "0.25rem 0" } }}
        onClick={closeMenu}
        onClose={closeMenu}>
        <MenuItem
          className="flex items-center gap-2.5 !px-4 !py-2 !text-sm !text-yellow-400"
          onClick={openChatInfoModal}>
          <span className="flex h-4 w-4 items-center" aria-hidden>
            <Info sx={{ width: "100%", height: "100%" }} />
          </span>
          Info
        </MenuItem>
        <MenuItem
          className="flex items-center gap-2.5 !px-4 !py-2 !text-sm !text-red-600"
          onClick={openDeleteChatDialog}>
          <span className="flex h-4 w-4 items-center" aria-hidden>
            <Delete sx={{ width: "100%", height: "100%" }} />
          </span>
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}
