import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { initializeApp } from "firebase/app"
import { getAuth, type Auth, type User } from "firebase/auth"

interface FirebaseState {
  auth: Auth
  user: User | null
  isLoading: boolean
}

const app = initializeApp({
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
})

const auth = getAuth(app)

const initialState: FirebaseState = {
  auth,
  user: null,
  isLoading: true,
}

const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUser, setIsLoading } = firebaseSlice.actions

export default firebaseSlice.reducer
