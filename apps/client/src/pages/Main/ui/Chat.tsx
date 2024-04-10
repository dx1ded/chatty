import { useQuery, useSubscription } from "@apollo/client"
import { useParams } from "react-router-dom"
import {
  GetChatQuery,
  GetChatQueryVariables,
  MessageSubscription,
  MessageSubscriptionVariables,
} from "__generated__/graphql"
import { getFragment } from "__generated__"
import { useAppDispatch, useAppSelector, CHAT_FIELDS, MESSAGE_FIELDS } from "shared/model"
import { setIsLoading, setChat, addMessage } from "shared/slices/chat"
import { updateChatList } from "shared/slices/chatList"
import { GET_CHAT } from "../model/chat.queries"
import { MESSAGE_SUBSCRIPTION } from "../model/message.queries"
import { ChatHeader } from "./ChatHeader"
import { ChatFooter } from "./ChatFooter"
import { MessageList } from "./MessageList"

export function Chat() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.firebase)
  const { chat, isLoading } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()

  useQuery<GetChatQuery, GetChatQueryVariables>(GET_CHAT, {
    skip: chat?.id === id,
    variables: { chatId: id! },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      const chat = getFragment(CHAT_FIELDS, data.chat)
      if (!chat) return
      dispatch(setChat(chat))
      dispatch(setIsLoading(false))
    },
  })

  useSubscription<MessageSubscription, MessageSubscriptionVariables>(MESSAGE_SUBSCRIPTION, {
    variables: { userId: user!.uid },
    onData(options) {
      const message = getFragment(MESSAGE_FIELDS, options.data.data?.newMessage)
      if (!message) return

      if (message.chat.id === chat?.id) {
        dispatch(addMessage(message))
      }

      dispatch(updateChatList(message))
    },
  })

  if (isLoading || !user || !chat?.id) return "Loading ..."

  const chatWith = chat.members.find((member) => member.firebaseId !== user.uid)!

  return (
    <section className="flex flex-1 flex-col gap-3">
      <ChatHeader name={chatWith.displayName} online={chatWith.online} />
      <MessageList data={chat.messages} />
      <ChatFooter />
    </section>
  )
}
