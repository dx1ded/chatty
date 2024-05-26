import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { getMainDefinition } from "@apollo/client/utilities"
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material"
import { createClient } from "graphql-ws"
import { useMemo } from "react"
import { Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { Auth } from "pages/Auth"
import { Main, Chat, NoSelected } from "pages/Main"
import { VerificationContext, type VerificationContextType } from "shared/model"
import { useNotification } from "shared/ui/Notification"
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
  const verified = useNotification({
    message: "Your e-mail has been verified!",
    className: "!bg-green-400",
    Icon: CheckCircleRounded,
  })
  const unverified = useNotification({
    message: "Your email is not verified!",
    className: "!bg-red-400",
    Icon: CancelRounded,
  })

  const verificationContextValue = useMemo<VerificationContextType>(
    () => ({
      openVerified: verified.openNotification,
      openUnverified: unverified.openNotification,
    }),
    [verified.openNotification, unverified.openNotification],
  )

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {verified.NotificationElement}
        {unverified.NotificationElement}
        <VerificationContext.Provider value={verificationContextValue}>
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
        </VerificationContext.Provider>
      </Provider>
    </ApolloProvider>
  )
}
