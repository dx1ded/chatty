import { combineReducers } from "@reduxjs/toolkit"
import firebaseReducer from "shared/slices/firebase"

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
})
