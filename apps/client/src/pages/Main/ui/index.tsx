import { Outlet } from "react-router-dom"
import { useMutation, useSubscription } from "@apollo/client"
import type {
  ChangeOnlineStatusMutation,
  ChangeOnlineStatusMutationVariables,
  MessageSubscription,
  MessageSubscriptionVariables,
  OnlineStatusSubscription,
  OnlineStatusSubscriptionVariables,
} from "__generated__/graphql"
import { getFragment } from "__generated__"
import { MESSAGE_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { addMessage, updateChatOnlineStatus } from "shared/slices/chat"
import { updateChatList, updateChatListOnlineStatus } from "shared/slices/chatList"
import { useEffect } from "react"
import { MESSAGE_SUBSCRIPTION } from "../model/message.queries"
import { Sidebar } from "./Sidebar"
import { CHANGE_ONLINE_STATUS, ONLINE_STATUS_SUBSCRIPTION } from "../model/user.queries"

export function Main() {
  const { user } = useAppSelector((state) => state.firebase)
  const { chat } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()
  const [changeOnlineStatus] = useMutation<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>(
    CHANGE_ONLINE_STATUS,
  )

  useEffect(() => {
    // Setting online status
    changeOnlineStatus({
      variables: { status: true },
    })

    const setOffline = () => {
      changeOnlineStatus({
        variables: { status: false },
      })
    }

    window.addEventListener("beforeunload", setOffline)

    return () => {
      window.removeEventListener("beforeunload", setOffline)
    }
  }, [changeOnlineStatus])

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

  useSubscription<OnlineStatusSubscription, OnlineStatusSubscriptionVariables>(ONLINE_STATUS_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const data = options.data.data?.onlineStatus
      if (!data || data.firebaseId === user?.uid) return
      dispatch(updateChatListOnlineStatus(data))
      dispatch(updateChatOnlineStatus(data))
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
