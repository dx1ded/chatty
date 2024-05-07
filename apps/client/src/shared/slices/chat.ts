import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { ChatFieldsFragment, MessageFieldsFragment } from "__generated__/graphql"

interface ChatState {
  chat: ChatFieldsFragment
  isLoading: boolean
  messagesLoading: boolean
  noMoreMessages: boolean
}

const initialState: ChatState = {
  chat: {} as ChatFieldsFragment,
  isLoading: true,
  messagesLoading: true,
  noMoreMessages: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChatState: () => initialState,
    setChat: (state, action: PayloadAction<ChatFieldsFragment>) => {
      state.chat = action.payload
    },
    setMessages: (state, action: PayloadAction<MessageFieldsFragment[]>) => {
      if (state.chat.messages?.length) {
        state.chat.messages = [...action.payload, ...state.chat.messages]
      } else {
        state.chat.messages = action.payload
      }
    },
    addMessage: (state, action: PayloadAction<MessageFieldsFragment>) => {
      state.chat.messages = [...state.chat.messages, action.payload]
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setMessagesLoading: (state, action: PayloadAction<boolean>) => {
      state.messagesLoading = action.payload
    },
    setNoMoreMessages: (state) => {
      state.noMoreMessages = true
    },
  },
})

export const {
  resetChatState,
  setChat,
  setMessages,
  addMessage,
  setIsLoading,
  setMessagesLoading,
  setNoMoreMessages,
} = chatSlice.actions

export default chatSlice.reducer
