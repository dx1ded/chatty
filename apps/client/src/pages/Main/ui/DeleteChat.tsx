import { useMutation } from "@apollo/client"
import { Dialog } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { Button } from "shared/ui/Button"
import { Subheading, Text } from "shared/ui/Typography"
import type { DeleteChatMutation, DeleteChatMutationVariables } from "__generated__/graphql"
import { useAppSelector } from "shared/model"
import { DELETE_CHAT } from "../model/queries/chat"

export function useDeleteChat() {
  const { chat } = useAppSelector((state) => state.chat)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteChat, { loading }] = useMutation<DeleteChatMutation, DeleteChatMutationVariables>(
    DELETE_CHAT,
    {
      variables: { deleteChatId: chat.id },
    },
  )

  const openDeleteChatDialog = useCallback(() => setIsDialogOpen(true), [])

  const DeleteChatDialog = useMemo(
    () => (
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
    ),
    [deleteChat, isDialogOpen, loading],
  )

  return {
    openDeleteChatDialog,
    DeleteChatDialog,
  }
}
