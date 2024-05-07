import { useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useParams } from "react-router-dom"
import type { RefetchFunction } from "@apollo/client/react/hooks/useSuspenseQuery"
import { getFragment } from "__generated__"
import type { ChatFieldsFragment, GetMessagesQuery, GetMessagesQueryVariables } from "__generated__/graphql"
import { MESSAGE_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { Message } from "shared/ui/Message"
import { Spinner } from "shared/ui/Spinner"
import { setMessagesLoading } from "shared/slices/chat"
import { MESSAGES_TAKE } from "../lib"

interface MessageListProps {
  data: ChatFieldsFragment["messages"]
  offset: number
  refetch: RefetchFunction<GetMessagesQuery, GetMessagesQueryVariables>
}

export function MessageList({ data, offset, refetch }: MessageListProps) {
  const { id } = useParams()
  const { messagesLoading, noMoreMessages } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(0)
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
          <Message key={message.id} message={message} uid={user!.uid} />
        ))}
      </div>
    </div>
  )
}
