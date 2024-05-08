import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { FindUserQuery } from "__generated__/graphql"

interface SearchState {
  items: FindUserQuery["findUser"] | null
  isLoading: boolean
}

const initialState: SearchState = {
  items: null,
  isLoading: false,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchItems: (state, { payload }: PayloadAction<SearchState["items"]>) => {
      state.items = payload
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
  },
})

export const { setSearchItems, setIsLoading } = searchSlice.actions

export default searchSlice.reducer
