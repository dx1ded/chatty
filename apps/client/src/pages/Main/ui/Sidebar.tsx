import { useQuery, useSubscription } from "@apollo/client"
import { GroupOutlined, LaunchOutlined } from "@mui/icons-material"
import { useRef } from "react"
import type {
  GetChatListQuery,
  GetChatListQueryVariables,
  ChatListSubscription,
  ChatListSubscriptionVariables,
  PreviewChatFieldsFragment,
} from "__generated__/graphql"
import Skeleton from "react-loading-skeleton"
import { PREVIEW_CHAT_FIELDS, useAppDispatch, useAppSelector } from "shared/model"
import { Text } from "shared/ui/Typography"
import { ChatCard } from "shared/ui/ChatCard"
import { ProfileCard } from "shared/ui/ProfileCard"
import { setChatList, setIsLoading } from "shared/slices/chatList"
import { getFragment } from "__generated__"
import { CHAT_LIST_SUBSCRIPTION, GET_CHAT_LIST } from "../model/chat.queries"
import { Search } from "./Search"

export function Sidebar() {
  const { user } = useAppSelector((state) => state.firebase)
  const search = useAppSelector((state) => state.search)
  const chatList = useAppSelector((state) => state.chatList)
  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)

  useQuery<GetChatListQuery, GetChatListQueryVariables>(GET_CHAT_LIST, {
    skip: !user?.uid,
    variables: { userId: user?.uid || "" },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      const chats = getFragment(PREVIEW_CHAT_FIELDS, data.findUserChats) as PreviewChatFieldsFragment[]
      // Did a casting here because for some reason getFragment always returns a ReadonlyArray which is supposed to be a bug - https://github.com/dotansimha/graphql-code-generator/issues/9803
      dispatch(setChatList(chats))
      dispatch(setIsLoading(false))
    },
  })

  useSubscription<ChatListSubscription, ChatListSubscriptionVariables>(CHAT_LIST_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const chat = getFragment(PREVIEW_CHAT_FIELDS, options.data.data?.newChat)
      if (!chat) return
      dispatch(setChatList([...chatList.items, chat]))
    },
  })

  return (
    <aside className="flex flex-shrink-0 basis-96 flex-col border-r border-[#F7F7F7]">
      <div className="mb-5 flex h-14 items-center justify-between border-b border-[#F7F7F7] px-5">
        <div className="flex items-center gap-2">
          <GroupOutlined className="text-dark" />
          <Text className="font-normal tracking-wide">Chat List</Text>
        </div>
        <button type="button" className="flex h-5 w-5 items-center">
          <LaunchOutlined className="text-dark" sx={{ width: "100%", height: "100%" }} />
        </button>
      </div>
      <Search ref={searchRef} />
      <div className="flex-1 overflow-y-auto">
        {chatList.isLoading || search.isLoading ? (
          <Skeleton count={3} height={54} inline containerClassName="flex flex-col gap-2.5 px-5" />
        ) : search.items.length ? (
          search.items.map((user) => (
            <ProfileCard
              key={user.firebaseId}
              id={user.firebaseId}
              name={user.displayName}
              profilePic={user.photoURL}
              searchRef={searchRef}
            />
          ))
        ) : (
          [...chatList.items]
            .sort((a, b) => Number(b.messages.at(-1)?.timeStamp) - Number(a.messages.at(-1)?.timeStamp))
            .map((chat) => <ChatCard key={chat!.id} chat={chat!} uid={user!.uid} />)
        )}
      </div>
    </aside>
  )
}
