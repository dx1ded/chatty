import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GetChatQuery, GetChatQueryVariables } from "__generated__/graphql"
import { getFragment } from "__generated__"
import { useAppDispatch, useAppSelector, CHAT_FIELDS } from "shared/model"
import { setIsLoading, setChat } from "shared/slices/chat"
import { Loader } from "shared/ui/Loader"
import { GET_CHAT } from "../model/chat.queries"
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
    variables: { chatId: id || "" },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      const chat = getFragment(CHAT_FIELDS, data.chat)
      if (!chat) return
      dispatch(setChat(chat))
      dispatch(setIsLoading(false))
    },
  })

  if (isLoading || !user || !chat?.id) return <Loader />

  const chatWith = chat.members.find((member) => member.firebaseId !== user.uid)!

  return (
    <section className="flex flex-1 flex-col gap-3">
      <ChatHeader name={chatWith.displayName} online={chatWith.online} />
      <MessageList data={chat.messages} />
      <ChatFooter />
    </section>
  )
}
