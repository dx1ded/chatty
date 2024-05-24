import { useMutation } from "@apollo/client"
import { Delete } from "@mui/icons-material"
import { Dialog, MenuItem } from "@mui/material"
import { useState } from "react"
import { Button } from "shared/ui/Button"
import { Subheading, Text } from "shared/ui/Typography"
import type { DeleteChatMutation, DeleteChatMutationVariables } from "__generated__/graphql"
import { useAppSelector } from "shared/model"
import { DELETE_CHAT } from "../model/queries/chat"

export function DeleteChat() {
  const { chat } = useAppSelector((state) => state.chat)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteChat, { loading }] = useMutation<DeleteChatMutation, DeleteChatMutationVariables>(
    DELETE_CHAT,
    {
      variables: { deleteChatId: chat.id },
    },
  )

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="delete-dialog-title">
        <div className="max-w-[28rem] px-3 py-4">
          <Subheading id="delete-dialog-title" className="mb-2 font-medium">
            Delete the chat?
          </Subheading>
          <Text className="mb-2.5">
            After deleting this chat you will lose all your messages with no ability to restore it. Are you
            sure you want to proceed?
          </Text>
          <div className="flex items-center justify-end gap-2 border-t pt-2.5">
            <Button variant="white" className="px-4" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button variant="danger" className="px-4" disabled={loading} onClick={() => deleteChat()}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
      <MenuItem
        className="flex items-center gap-2.5 !px-3 !py-1.5 !text-sm !text-red-600"
        onClick={() => setIsDialogOpen(true)}>
        <span className="flex h-4 w-4 items-center" aria-hidden>
          <Delete sx={{ width: "100%", height: "100%" }} />
        </span>
        Delete
      </MenuItem>
    </>
  )
}
