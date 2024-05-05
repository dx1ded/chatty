import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
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
import { GET_CHAT } from "../model/chat.queries"
import { ChatHeader } from "./ChatHeader"
import { ChatFooter } from "./ChatFooter"
import { MessageList } from "./MessageList"
import { GET_MESSAGES } from "../model/message.queries"

const MESSAGES_OFFSET = 15

export function Chat() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.firebase)
  const { chat, isLoading } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()
  const [skip, setSkip] = useState(0)

  // Reset state when change a chat
  useEffect(() => {
    return () => {
      dispatch(resetChatState())
      setSkip(0)
    }
  }, [id, dispatch])

  useQuery<GetChatQuery, GetChatQueryVariables>(GET_CHAT, {
    skip: chat?.id === id,
    variables: { chatId: id || "" },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      const chat = getFragment(CHAT_FIELDS, data.chat)
      if (!chat) return
      dispatch(setChat(chat))
      dispatch(setIsLoading(false))
    },
  })

  useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GET_MESSAGES, {
    skip: !chat?.id,
    variables: { chatId: id || "", take: MESSAGES_OFFSET, skip },
    fetchPolicy: "no-cache",
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
      <MessageList data={chat.messages} setSkip={setSkip} />
      <ChatFooter />
    </section>
  )
}
