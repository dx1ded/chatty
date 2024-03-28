import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { Message } from "shared/ui/Message"
import { ChatQuery, ChatQueryVariables } from "codegen/graphql"
import { useAppDispatch, useAppSelector } from "shared/model"
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
    variables: { chatId: id! },
    skip: chat.id === id,
    onCompleted(data) {
      if (!data.chat) return
      dispatch(setChat(data.chat))
      dispatch(setIsLoading(false))
    },
  })

  if (isLoading || !user || !chat.id) return "Loading ..."

  const chatWith = chat.members.find((member) => member.firebaseId !== user.uid)!

  return (
    <section className="flex flex-1 flex-col gap-3">
      <ChatHeader name={chatWith.displayName} online={chatWith.online} />
      <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-9 py-8">
        {chat.messages.map((message) => (
          <Message key={message!.id} data={message!} uid={user.uid} />
        ))}
      </div>
      <ChatFooter />
    </section>
  )
}
