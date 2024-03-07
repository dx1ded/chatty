import { Route, Routes } from "react-router-dom"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { Auth } from "pages/Auth"
import "./styles/index.css"
import { FirebaseContext } from "shared/model"

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
const defaultValue = { auth }

export function App() {
  return (
    <FirebaseContext.Provider value={defaultValue}>
      <Routes>
        <Route element={<Auth />} path="/" />
      </Routes>
    </FirebaseContext.Provider>
  )
}
