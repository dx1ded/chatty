import { Route, Routes } from "react-router-dom"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { Auth } from "pages/Auth"
import "./styles/index.css"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { Main } from "pages/Main"
import { Provider } from "react-redux"
import { PrivateRoutes, PublicRoutes, OnAuthStateChanged } from "./ui"
import { store } from "./store"

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

export function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <OnAuthStateChanged>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route element={<Auth />} path="/auth" />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route element={<Main />} path="/" />
            </Route>
          </Routes>
        </OnAuthStateChanged>
      </Provider>
    </ApolloProvider>
  )
}
