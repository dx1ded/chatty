import { useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useOutletContext, useParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import type { RefetchFunction } from "@apollo/client/react/hooks/useSuspenseQuery"
import { useMutation } from "@apollo/client"
import { getFragment } from "__generated__"
import type { ChatFieldsFragment, GetMessagesQuery, GetMessagesQueryVariables } from "__generated__/graphql"
import { MESSAGE_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { updateChatListMessagesRead } from "shared/slices/chatList"
import { Message } from "shared/ui/Message"
import { Spinner } from "shared/ui/Spinner"
import { setMessagesLoading, updateMessagesRead } from "shared/slices/chat"
import type { MessageID } from "shared/lib"
import { READ_MESSAGES } from "../model/queries/message"
import { MESSAGES_TAKE } from "../lib"

interface MessageListProps {
  data: ChatFieldsFragment["messages"]
  refetch: RefetchFunction<GetMessagesQuery, GetMessagesQueryVariables>
}

export function MessageList({ data, refetch }: MessageListProps) {
  const { id } = useParams()
  const { messagesLoading, noMoreMessages } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()
  const offset = useOutletContext<number>()
  const [page, setPage] = useState(0)
  const [read, setRead] = useState<MessageID[]>([])
  const [sendReadMessages] = useMutation(READ_MESSAGES, {
    variables: {
      messageIds: read,
    },
    onCompleted: () => setRead([]),
  })

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

  return (
    <div className="flex max-h-full flex-1 flex-col-reverse overflow-y-auto px-9 py-8">
      <div className="flex flex-col gap-10">
        {messagesLoading ? <Spinner className="self-center" /> : <div ref={ref} />}
        {messages.map((message, i) => (
          <Message
            key={message.id}
            message={message}
            uid={user!.uid}
            isLatest={i === messages.length - 1}
            readMessage={readMessage}
          />
        ))}
      </div>
    </div>
  )
}
