import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useMutation, useSubscription } from "@apollo/client"
import type {
  ChangeOnlineStatusMutation,
  ChangeOnlineStatusMutationVariables,
  ChatDeletedSubscription,
  ChatDeletedSubscriptionVariables,
  MessageReadSubscription,
  MessageReadSubscriptionVariables,
  NewChatSubscription,
  NewChatSubscriptionVariables,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  OnlineStatusSubscription,
  OnlineStatusSubscriptionVariables,
} from "__generated__/graphql"
import { getFragment } from "__generated__"
import { setChatList, updateChatList, updateChatListOnlineStatus } from "shared/slices/chatList"
import { addMessage, updateChatOnlineStatus, updateMessagesRead } from "shared/slices/chat"
import { MESSAGE_FIELDS, PREVIEW_CHAT_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { VerificationBar } from "shared/ui/Verification"
import { CHANGE_ONLINE_STATUS, ONLINE_STATUS_SUBSCRIPTION } from "../model/queries/user"
import { CHAT_DELETED_SUBSCRIPTION, NEW_CHAT_SUBSCRIPTION } from "../model/queries/chat"
import { MESSAGE_READ_SUBSCRIPTION, NEW_MESSAGE_SUBSCRIPTION } from "../model/queries/message"
import { Sidebar } from "./Sidebar"

export function Main() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.firebase)
  const { chat } = useAppSelector((state) => state.chat)
  const chatList = useAppSelector((state) => state.chatList)
  const dispatch = useAppDispatch()
  const [offset, setOffset] = useState(0)
  const [changeOnlineStatus] = useMutation<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>(
    CHANGE_ONLINE_STATUS,
  )

  useEffect(() => {
    // Setting online status
    changeOnlineStatus({
      variables: { status: true },
    })

    window.onbeforeunload = () => {
      changeOnlineStatus({
        variables: { status: false },
      })
    }

    return () => {
      window.onbeforeunload = null
    }
  }, [changeOnlineStatus])

  useSubscription<OnlineStatusSubscription, OnlineStatusSubscriptionVariables>(ONLINE_STATUS_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const data = options.data.data?.onlineStatus
      if (!data || data.firebaseId === user?.uid) return
      dispatch(updateChatListOnlineStatus(data))
      dispatch(updateChatOnlineStatus(data))
    },
  })

  useSubscription<NewChatSubscription, NewChatSubscriptionVariables>(NEW_CHAT_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const chat = getFragment(PREVIEW_CHAT_FIELDS, options.data.data?.newChat)
      if (!chat) return
      dispatch(setChatList([...chatList.items, chat]))
    },
  })

  useSubscription<ChatDeletedSubscription, ChatDeletedSubscriptionVariables>(CHAT_DELETED_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const deletedChat = options.data.data?.chatDeleted
      if (!deletedChat) return
      dispatch(setChatList(chatList.items.filter((chat) => chat.id !== deletedChat.id)))
      // Navigating to the main page if another user is currently in the chat
      if (deletedChat.id === id) navigate("/")
    },
  })

  useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const message = getFragment(MESSAGE_FIELDS, options.data.data?.newMessage)
      if (!message) return

      if (message.chat.id === chat?.id) {
        dispatch(addMessage(message))
      }

      dispatch(
        updateChatList({
          userId: user?.uid || "",
          message,
        }),
      )

      if (chat.id === id) setOffset((prev) => prev + 1)
    },
  })

  useSubscription<MessageReadSubscription, MessageReadSubscriptionVariables>(MESSAGE_READ_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const messageIds = options.data.data?.messageRead.map((message) => message.id)
      if (!messageIds) return

      dispatch(updateMessagesRead(messageIds))
    },
  })

  return (
    <div className="flex h-screen min-h-[32rem]">
      <VerificationBar />
      <Sidebar />
      <Outlet context={offset} />
    </div>
  )
}

export { Chat } from "./Chat"
export { NoSelected } from "./NoSelected"
