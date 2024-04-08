import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { FindUserQuery } from "__generated__/graphql"

interface SearchState {
  items: FindUserQuery["findUser"]
  isLoading: boolean
}

const initialState: SearchState = {
  items: [],
  isLoading: false,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchItems: (state, action: PayloadAction<SearchState["items"]>) => {
      state.items = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setSearchItems, setIsLoading } = searchSlice.actions

export default searchSlice.reducer
