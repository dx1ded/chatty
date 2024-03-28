import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Chat } from "codegen/graphql"

interface ChatListState {
  chats: Chat[]
  isLoading: boolean
}

const initialState: ChatListState = {
  chats: [],
  isLoading: true,
}

const chatListSlice = createSlice({
  name: "chatList",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setChats, setIsLoading } = chatListSlice.actions

export default chatListSlice.reducer
