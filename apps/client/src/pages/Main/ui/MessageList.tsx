import { getFragment } from "__generated__"
import type { ChatFieldsFragment } from "__generated__/graphql"
import { MESSAGE_FIELDS, useAppSelector } from "shared/model"
import { Message } from "shared/ui/Message"

interface MessageListProps {
  data: ChatFieldsFragment["messages"]
}

export function MessageList({ data }: MessageListProps) {
  const { user } = useAppSelector((state) => state.firebase)
  const messages = data.map((_fragment) => getFragment(MESSAGE_FIELDS, _fragment))

  // rerender issue, fix later!
  return (
    <div className="flex max-h-full flex-1 flex-col-reverse overflow-y-auto px-9 py-8">
      <div className="flex flex-col gap-10">
        {messages.map((message) => (
          <Message key={message.id} message={message} uid={user!.uid} />
        ))}
      </div>
    </div>
  )
}
