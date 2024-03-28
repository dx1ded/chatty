import { combineReducers } from "@reduxjs/toolkit"
import firebaseReducer from "shared/slices/firebase"
import searchReducer from "shared/slices/search"
import chatReducer from "shared/slices/chat"
import chatListReducer from "shared/slices/chatList"

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  search: searchReducer,
  chat: chatReducer,
  chatList: chatListReducer,
})
