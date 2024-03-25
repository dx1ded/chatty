import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { Message } from "shared/ui/Message"
import { ChatQuery, ChatQueryVariables } from "graphql/graphql"
import { useAppSelector } from "shared/model"
import { GET_CHAT } from "../model/chat.queries"
import { ChatHeader } from "./ChatHeader"
import { ChatFooter } from "./ChatFooter"
import { NoSelected } from "./NoSelected"

export function Chat() {
  const { id } = useParams()
  const { user } = useAppSelector((state) => state.firebase)
  const { loading, data } = useQuery<ChatQuery, ChatQueryVariables>(GET_CHAT, {
    variables: { chatId: id || "" },
  })

  if (loading) return "Loading ..."
  if (!data || !user) return "No data"

  const chatWith = data.chat?.members.find((member) => member.firebaseId !== user.uid)!

  return (
    <section className="flex flex-1 flex-col gap-3">
      {data.chat ? (
        <>
          <ChatHeader name={chatWith.displayName} online={chatWith.online} />
          <div className="flex flex-1 flex-col gap-10 overflow-y-auto px-9 py-8">
            {data.chat?.messages.map((message) => (
              <Message key={message!.id} data={message!} uid={user.uid} />
            ))}
          </div>
          <ChatFooter />
        </>
      ) : (
        <NoSelected />
      )}
    </section>
  )
}
