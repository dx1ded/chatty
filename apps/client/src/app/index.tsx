import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws"
import { Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { Auth } from "pages/Auth"
import { Main, Chat, NoSelected } from "pages/Main"
import { VerificationProvider } from "shared/ui/Verification"
import { PrivateRoutes, PublicRoutes, OnAuthStateChanged } from "./ui"
import { store } from "./store"

import "react-loading-skeleton/dist/skeleton.css"
import "./styles/index.css"

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL,
})

const authLink = setContext(async (_, { headers }) => {
  const token = (await store.getState().firebase.user?.getIdToken()) || ""

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS_URL,
  }),
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === "OperationDefinition" && definition.operation === "subscription"
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <VerificationProvider>
          <OnAuthStateChanged>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route element={<Auth />} path="/auth" />
              </Route>
              <Route element={<PrivateRoutes />}>
                <Route element={<Main />} path="/">
                  <Route element={<NoSelected />} path="/" />
                  <Route element={<Chat />} path="/chat/:id?" />
                </Route>
              </Route>
            </Routes>
          </OnAuthStateChanged>
        </VerificationProvider>
      </Provider>
    </ApolloProvider>
  )
}
