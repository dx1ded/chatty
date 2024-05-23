import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getFragment } from "__generated__"
import type {
  ChatFieldsFragment,
  MessageFieldsFragment,
  OnlineStatusSubscription,
} from "__generated__/graphql"
import { MESSAGE_FIELDS } from "shared/model"

interface ChatState {
  chat: ChatFieldsFragment
  isLoading: boolean
  messagesLoading: boolean
  noMoreMessages: boolean
}

const initialState: ChatState = {
  chat: {
    __typename: "Chat",
    id: "",
    members: [],
    messages: [],
  },
  isLoading: true,
  messagesLoading: true,
  noMoreMessages: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChatState: () => initialState,
    setChat: (state, { payload }: PayloadAction<ChatFieldsFragment>) => {
      state.chat = payload
    },
    setMessages: (state, { payload }: PayloadAction<MessageFieldsFragment[]>) => {
      if (state.chat.messages?.length) {
        state.chat.messages = [...payload, ...state.chat.messages]
      } else {
        state.chat.messages = payload
      }
    },
    addMessage: (state, { payload }: PayloadAction<MessageFieldsFragment>) => {
      state.chat.messages = [...state.chat.messages, payload]
    },
    updateMessagesRead: (state, { payload }: PayloadAction<MessageFieldsFragment["id"][]>) => {
      state.chat.messages = state.chat.messages.map((fragment) => {
        const message = getFragment(MESSAGE_FIELDS, fragment)
        return payload.includes(message.id) ? { ...message, read: true } : fragment
      })
    },
    updateChatOnlineStatus: (state, { payload }: PayloadAction<OnlineStatusSubscription["onlineStatus"]>) => {
      state.chat.members = state.chat.members.map((member) =>
        member.firebaseId === payload.firebaseId ? { ...member, online: payload.online } : member,
      )
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setMessagesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.messagesLoading = payload
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
  updateMessagesRead,
  updateChatOnlineStatus,
  setIsLoading,
  setMessagesLoading,
  setNoMoreMessages,
} = chatSlice.actions

export default chatSlice.reducer
