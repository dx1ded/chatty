import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SidebarState {
  isOpen: boolean
}

const initialState: SidebarState = {
  isOpen: false,
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload
    },
  },
})

export const { setIsOpen } = sidebarSlice.actions

export default sidebarSlice.reducer
