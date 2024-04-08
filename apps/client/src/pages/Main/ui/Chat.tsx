import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { Message } from "shared/ui/Message"
import { ChatQuery, ChatQueryVariables } from "__generated__/graphql"
import { getFragment } from "__generated__"
import { useAppDispatch, useAppSelector, CHAT_FIELDS } from "shared/model"
import { setIsLoading, setChat } from "shared/slices/chat"
import { GET_CHAT } from "../model/chat.queries"
import { ChatHeader } from "./ChatHeader"
import { ChatFooter } from "./ChatFooter"

export function Chat() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.firebase)
  const { chat, isLoading } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()

  useQuery<ChatQuery, ChatQueryVariables>(GET_CHAT, {
    skip: chat?.id === id,
    variables: { chatId: id! },
    onCompleted(data) {
      const chat = getFragment(CHAT_FIELDS, data.chat)
      if (!chat) return
      dispatch(setChat(chat))
      dispatch(setIsLoading(false))
    },
  })

  if (isLoading || !user || !chat?.id) return "Loading ..."

  const chatWith = chat.members.find((member) => member.firebaseId !== user.uid)!

  return (
    <section className="flex flex-1 flex-col gap-3">
      <ChatHeader name={chatWith.displayName} online={chatWith.online} />
      <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-9 py-8">
        {chat.messages.map((message, i) => (
          <Message key={i} data={message!} uid={user.uid} />
        ))}
      </div>
      <ChatFooter />
    </section>
  )
}
