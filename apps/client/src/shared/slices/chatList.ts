import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { PreviewChatFieldsFragment, MessageFieldsFragment } from "__generated__/graphql"

interface ChatListState {
  items: PreviewChatFieldsFragment[]
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
    setChatList: (state, action: PayloadAction<PreviewChatFieldsFragment[]>) => {
      state.items = action.payload
    },
    updateChatList: (state, { payload }: PayloadAction<MessageFieldsFragment>) => {
      state.items = state.items.map((chat) =>
        chat.id === payload.chat.id
          ? { ...chat, messages: [...chat.messages, payload], newMessagesCount: chat.newMessagesCount + 1 }
          : chat,
      )
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setChatList, updateChatList, setIsLoading } = chatListSlice.actions

export default chatListSlice.reducer
