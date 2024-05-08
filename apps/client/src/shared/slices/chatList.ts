import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PreviewChatFieldsFragment, MessageFieldsFragment, User } from "__generated__/graphql"

interface ChatListState {
  items: PreviewChatFieldsFragment[]
  isLoading: boolean
}

const initialState: ChatListState = {
  items: [],
  isLoading: true,
}

interface UpdateChatListProps {
  userId: User["firebaseId"]
  message: MessageFieldsFragment
}

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChatList: (state, { payload }: PayloadAction<PreviewChatFieldsFragment[]>) => {
      state.items = payload
    },
    updateChatList: (state, { payload }: PayloadAction<UpdateChatListProps>) => {
      state.items = state.items.map((chat) =>
        chat.id === payload.message.chat.id
          ? {
              ...chat,
              messages: [...chat.messages, payload.message],
              newMessagesCount:
                payload.message.author.firebaseId === payload.userId
                  ? chat.newMessagesCount
                  : chat.newMessagesCount + 1,
            }
          : chat,
      )
    },
    updateChatListMessagesRead: (state, { payload }: PayloadAction<MessageFieldsFragment["id"][]>) => {
      state.items = state.items.map((chat) => ({
        ...chat,
        ...chat.messages.reduce<Pick<PreviewChatFieldsFragment, "messages" | "newMessagesCount">>(
          (acc, message) => {
            if (payload.includes(message.id)) {
              acc.messages.push({ ...message, read: true })
              acc.newMessagesCount -= 1
            } else {
              acc.messages.push(message)
            }

            return acc
          },
          { messages: [], newMessagesCount: chat.newMessagesCount },
        ),
      }))
    },
    updateChatListOnlineStatus: (state, { payload }: PayloadAction<Pick<User, "firebaseId" | "online">>) => {
      state.items = state.items.map((chat) =>
        chat.members.some((member) => member.firebaseId === payload.firebaseId)
          ? {
              ...chat,
              members: chat.members.map((member) =>
                member.firebaseId === payload.firebaseId ? { ...member, online: payload.online } : member,
              ),
            }
          : chat,
      )
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
  },
})

export const {
  setChatList,
  updateChatList,
  updateChatListMessagesRead,
  updateChatListOnlineStatus,
  setIsLoading,
} = chatListSlice.actions

export default chatListSlice.reducer
