import { useQuery, useSubscription } from "@apollo/client"
import { GroupOutlined, LaunchOutlined } from "@mui/icons-material"
import type {
  GetUserChatsQuery,
  GetUserChatsQueryVariables,
  ChatListSubscription,
  ChatListSubscriptionVariables,
} from "codegen/graphql"
import Skeleton from "react-loading-skeleton"
import { useAppDispatch, useAppSelector } from "shared/model"
import { Text } from "shared/ui/Typography"
import { ChatCard } from "shared/ui/ChatCard"
import { ProfileCard } from "shared/ui/ProfileCard"
import { setChats, setIsLoading } from "shared/slices/chatList"
import { CHATS_SUBSCRIPTION, GET_CHATS } from "../model/chat.queries"
import { Search } from "./Search"

export function Sidebar() {
  const { user } = useAppSelector((state) => state.firebase)
  const search = useAppSelector((state) => state.search)
  const chatList = useAppSelector((state) => state.chatList)
  const dispatch = useAppDispatch()

  useQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GET_CHATS, {
    skip: !user?.uid,
    variables: { userId: user?.uid || "" },
    onCompleted(data) {
      if (!data.findUserChats) return
      dispatch(setChats(data.findUserChats))
      dispatch(setIsLoading(false))
    },
  })

  useSubscription<ChatListSubscription, ChatListSubscriptionVariables>(CHATS_SUBSCRIPTION, {
    variables: { userId: user?.uid || "" },
    onData(options) {
      const data = options.data.data?.chatList
      if (!data) return
      dispatch(setChats([...chatList.chats, data]))
    },
  })

  return (
    <aside className="flex flex-shrink-0 basis-96 flex-col border-r border-[#F7F7F7]">
      <div className="mb-5 flex h-14 items-center justify-between border-b border-[#F7F7F7] px-5">
        <div className="flex items-center gap-2">
          <GroupOutlined className="text-dark" />
          <Text className="font-normal tracking-wide">Chats List</Text>
        </div>
        <button type="button" className="flex h-5 w-5 items-center">
          <LaunchOutlined className="text-dark" sx={{ width: "100%", height: "100%" }} />
        </button>
      </div>
      <Search />
      <div className="flex-1 overflow-y-auto">
        {chatList.isLoading || search.isLoading ? (
          <Skeleton count={3} height={54} inline containerClassName="flex flex-col gap-2.5 px-5" />
        ) : search.result.length ? (
          search.result.map((user) => (
            <ProfileCard
              key={user.firebaseId}
              id={user.firebaseId}
              name={user.displayName}
              profilePic={user.photoURL}
            />
          ))
        ) : (
          chatList.chats.map((chat) => <ChatCard key={chat!.id} chat={chat!} uid={user!.uid} />)
        )}
      </div>
    </aside>
  )
}
