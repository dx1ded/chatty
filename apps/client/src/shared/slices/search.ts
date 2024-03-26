import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { FindUserQuery } from "graphql/graphql"

interface SearchState {
  result: FindUserQuery["findUser"]
  isLoading: boolean
}

const initialState: SearchState = {
  result: [],
  isLoading: false,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<SearchState["result"]>) => {
      state.result = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setResult, setIsLoading } = searchSlice.actions

export default searchSlice.reducer
