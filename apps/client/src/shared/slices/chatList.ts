import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ChatFieldsFragment, MessageFieldsFragment } from "__generated__/graphql"

type Chats = ChatFieldsFragment[]

interface ChatListState {
  items: Chats
  isLoading: boolean
}

const initialState: ChatListState = {
  items: [],
  isLoading: true,
}

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChatList: (state, action: PayloadAction<Chats>) => {
      state.items = action.payload
    },
    updateChatList: (state, { payload }: PayloadAction<MessageFieldsFragment>) => {
      state.items = state.items.map((chat) =>
        chat.id === payload.chat.id ? { ...chat, messages: [...chat.messages, payload] } : chat,
      )
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setChatList, updateChatList, setIsLoading } = chatListSlice.actions

export default chatListSlice.reducer
