import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { Message } from "shared/ui/Message"
import { ChatQuery, ChatQueryVariables } from "graphql/graphql"
import { useAppDispatch, useAppSelector } from "shared/model"
import { setIsLoading, setResult } from "shared/slices/chat"
import { GET_CHAT } from "../model/chat.queries"
import { ChatHeader } from "./ChatHeader"
import { ChatFooter } from "./ChatFooter"

export function Chat() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.firebase)
  const { result, isLoading } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()

  useQuery<ChatQuery, ChatQueryVariables>(GET_CHAT, {
    variables: { chatId: id! },
    skip: result.id === id,
    onCompleted(data) {
      dispatch(setResult(data.chat!))
      dispatch(setIsLoading(false))
    },
  })

  if (isLoading || !user || !result.id) return "Loading ..."

  const chatWith = result.members.find((member) => member.firebaseId !== user.uid)!

  return (
    <section className="flex flex-1 flex-col gap-3">
      <ChatHeader name={chatWith.displayName} online={chatWith.online} />
      <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-9 py-8">
        {result.messages.map((message) => (
          <Message key={message!.id} data={message!} uid={user.uid} />
        ))}
      </div>
      <ChatFooter />
    </section>
  )
}
