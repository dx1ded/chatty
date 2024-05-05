import type { Dispatch, SetStateAction } from "react"
import { useInView } from "react-intersection-observer"
import { getFragment } from "__generated__"
import type { ChatFieldsFragment } from "__generated__/graphql"
import { MESSAGE_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { Message } from "shared/ui/Message"
import { Spinner } from "shared/ui/Spinner"
import { setMessagesLoading } from "shared/slices/chat"

interface MessageListProps {
  data: ChatFieldsFragment["messages"]
  setSkip: Dispatch<SetStateAction<number>>
}

export function MessageList({ data, setSkip }: MessageListProps) {
  const { messagesLoading, noMoreMessages } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.firebase)
  const dispatch = useAppDispatch()
  const messages = data.map((_fragment) => getFragment(MESSAGE_FIELDS, _fragment))

  const { ref } = useInView({
    onChange(inView) {
      if (!inView || noMoreMessages) return
      setSkip((prev) => prev + 1)
      dispatch(setMessagesLoading(true))
    },
  })

  return (
    <div className="flex max-h-full flex-1 flex-col-reverse overflow-y-auto px-9 py-8">
      <div className="flex flex-col gap-10">
        {messagesLoading ? <Spinner type="round" className="self-center" /> : <div ref={ref} />}
        {messages.map((message) => (
          <Message key={message.id} message={message} uid={user!.uid} />
        ))}
      </div>
    </div>
  )
}
