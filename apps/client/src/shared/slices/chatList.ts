import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ChatFieldsFragment } from "__generated__/graphql"

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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setChatList, setIsLoading } = chatListSlice.actions

export default chatListSlice.reducer
