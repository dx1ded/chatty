import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Chat } from "codegen/graphql"

interface ChatState {
  chat: Chat
  isLoading: boolean
}

const initialState: ChatState = {
  chat: {} as Chat,
  isLoading: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<Chat>) => {
      state.chat = action.payload
    },
    addMessage: (state, action: PayloadAction<Chat["messages"][number]>) => {
      state.chat.messages = [...state.chat.messages, action.payload]
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setChat, setIsLoading } = chatSlice.actions

export default chatSlice.reducer
