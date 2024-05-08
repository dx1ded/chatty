import { useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useParams } from "react-router-dom"
import type { RefetchFunction } from "@apollo/client/react/hooks/useSuspenseQuery"
import { getFragment } from "__generated__"
import type {
  ChatFieldsFragment,
  GetMessagesQuery,
  GetMessagesQueryVariables,
  MessageFieldsFragment,
} from "__generated__/graphql"
import { MESSAGE_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { Message } from "shared/ui/Message"
import { Spinner } from "shared/ui/Spinner"
import { setMessagesLoading, updateMessagesRead } from "shared/slices/chat"
import { useMutation } from "@apollo/client"
import { useDebouncedCallback } from "use-debounce"
import { updateChatListMessagesRead } from "shared/slices/chatList"
import { MESSAGES_TAKE } from "../lib"
import { READ_MESSAGES } from "../model/message.queries"

interface MessageListProps {
  data: ChatFieldsFragment["messages"]
  offset: number
  refetch: RefetchFunction<GetMessagesQuery, GetMessagesQueryVariables>
}

type MessageID = MessageFieldsFragment["id"]

export function MessageList({ data, offset, refetch }: MessageListProps) {
  const { id } = useParams()
  const { messagesLoading, noMoreMessages } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(0)
  const [read, setRead] = useState<MessageID[]>([])
  const [sendReadMessages] = useMutation(READ_MESSAGES, {
    variables: {
      messageIds: read,
    },
    onCompleted: () => setRead([]),
  })

  const sendReadMessagedDebounced = useDebouncedCallback(() => {
    dispatch(updateChatListMessagesRead(read))
    sendReadMessages()
  }, 500)

  const readMessage = (id: MessageID) => {
    setRead((prev) => [...prev, id])
    // Updating immediately for the person who read the message so it doesn't send the same id again (since message.read stays `false`)
    dispatch(updateMessagesRead([id]))
    sendReadMessagedDebounced()
  }

  const messages = useMemo(() => data.map((_fragment) => getFragment(MESSAGE_FIELDS, _fragment)), [data])

  const { ref } = useInView({
    onChange(inView) {
      if (!inView || noMoreMessages) return
      refetch({
        chatId: id || "",
        take: MESSAGES_TAKE,
        skip: (page + 1) * MESSAGES_TAKE + offset,
      })
      setPage((prev) => prev + 1)
      dispatch(setMessagesLoading(true))
    },
  })

  return (
    <div className="flex max-h-full flex-1 flex-col-reverse overflow-y-auto px-9 py-8">
      <div className="flex flex-col gap-10">
        {messagesLoading ? <Spinner className="self-center" /> : <div ref={ref} />}
        {messages.map((message) => (
          <Message key={message.id} message={message} uid={user!.uid} readMessage={readMessage} />
        ))}
      </div>
    </div>
  )
}
