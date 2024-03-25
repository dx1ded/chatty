import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { ChatFieldsFragment } from "graphql/graphql"

interface ChatState {
  result: ChatFieldsFragment
  isLoading: boolean
}

const initialState: ChatState = {
  result: {} as ChatFieldsFragment,
  isLoading: false,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<ChatFieldsFragment>) => {
      state.result = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setResult, setIsLoading } = chatSlice.actions

export default chatSlice.reducer
