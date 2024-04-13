import { Outlet } from "react-router-dom"
import { useSubscription } from "@apollo/client"
import type { MessageSubscription, MessageSubscriptionVariables } from "__generated__/graphql"
import { getFragment } from "__generated__"
import { MESSAGE_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { addMessage } from "shared/slices/chat"
import { updateChatList } from "shared/slices/chatList"
import { MESSAGE_SUBSCRIPTION } from "../model/message.queries"
import { Sidebar } from "./Sidebar"

export function Main() {
  const { user } = useAppSelector((state) => state.firebase)
  const { chat } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()

  useSubscription<MessageSubscription, MessageSubscriptionVariables>(MESSAGE_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const message = getFragment(MESSAGE_FIELDS, options.data.data?.newMessage)
      if (!message) return

      if (message.chat.id === chat?.id) {
        dispatch(addMessage(message))
      }

      dispatch(updateChatList(message))
    },
  })

  return (
    <div className="flex h-screen min-h-[32rem]">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export { Chat } from "./Chat"
export { NoSelected } from "./NoSelected"
