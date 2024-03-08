import { Route, Routes } from "react-router-dom"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { Auth } from "pages/Auth"
import "./styles/index.css"
import { FirebaseProvider } from "shared/model"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { Main } from "pages/Main"
import { PrivateRoutes, PublicRoutes } from "./model"

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
const defaultValue = {
  auth,
}

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

export function App() {
  return (
    <ApolloProvider client={client}>
      <FirebaseProvider value={defaultValue}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<Auth />} path="/auth" />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<Main />} path="/" />
          </Route>
        </Routes>
      </FirebaseProvider>
    </ApolloProvider>
  )
}
