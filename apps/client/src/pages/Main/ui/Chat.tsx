import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import type {
  GetChatQuery,
  GetChatQueryVariables,
  GetMessagesQuery,
  GetMessagesQueryVariables,
  MessageFieldsFragment,
} from "__generated__/graphql"
import { getFragment } from "__generated__"
import { useAppDispatch, useAppSelector, CHAT_FIELDS, MESSAGE_FIELDS } from "shared/model"
import {
  setIsLoading,
  setChat,
  setMessages,
  setMessagesLoading,
  setNoMoreMessages,
  resetChatState,
} from "shared/slices/chat"
import { Loader } from "shared/ui/Loader"
import { GET_CHAT } from "../model/queries/chat"
import { GET_MESSAGES } from "../model/queries/message"
import { ChatHeader } from "./ChatHeader"
import { ChatFooter } from "./ChatFooter"
import { MessageList } from "./MessageList"
import { MESSAGES_TAKE } from "../lib"

export function Chat() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.firebase)
  const { chat, isLoading } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()

  // Reset state when change a chat
  useEffect(() => {
    return () => {
      dispatch(resetChatState())
    }
  }, [id, dispatch])

  useQuery<GetChatQuery, GetChatQueryVariables>(GET_CHAT, {
    skip: chat?.id === id,
    variables: { chatId: id || "" },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      const chat = getFragment(CHAT_FIELDS, data.chat)
      if (!chat) return
      dispatch(setChat(chat))
      dispatch(setIsLoading(false))
    },
  })

  const { refetch } = useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GET_MESSAGES, {
    variables: { chatId: id || "", take: MESSAGES_TAKE, skip: 0 },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      // `as` is used because getFragment makes an array readonly for some reason
      const messages = getFragment(MESSAGE_FIELDS, data.messages) as MessageFieldsFragment[]
      if (!messages) return
      if (messages.length < 15) dispatch(setNoMoreMessages())
      // Reversed because newest messages should be on the bottom
      dispatch(setMessages(messages.reverse()))
      dispatch(setMessagesLoading(false))
    },
  })

  if (isLoading || !user || !chat?.id) return <Loader />

  const chatWith = chat.members.find((member) => member.firebaseId !== user.uid)!

  return (
    <section className="flex flex-1 flex-col gap-3">
      <ChatHeader name={chatWith.displayName} online={chatWith.online} />
      <MessageList data={chat.messages} refetch={refetch} />
      <ChatFooter />
    </section>
  )
}
