import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { ChatFieldsFragment, MessageFieldsFragment } from "__generated__/graphql"

interface ChatState {
  chat: ChatFieldsFragment
  isLoading: boolean
}

const initialState: ChatState = {
  chat: {} as ChatFieldsFragment,
  isLoading: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<ChatFieldsFragment>) => {
      state.chat = action.payload
    },
    addMessage: (state, action: PayloadAction<MessageFieldsFragment>) => {
      state.chat.messages = [...state.chat.messages, action.payload]
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setChat, addMessage, setIsLoading } = chatSlice.actions

export default chatSlice.reducer
