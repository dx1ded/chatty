import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { initializeApp, cert } from "firebase-admin/app"
import { getAuth, type DecodedIdToken } from "firebase-admin/auth"
import { apolloServerOptions } from "./modules"
import firebaseCredentials from "./credentials"

const server = new ApolloServer(apolloServerOptions)
const app = initializeApp({
  credential: cert(firebaseCredentials),
})

const auth = getAuth(app)

startStandaloneServer(server, {
  listen: { port: Number(process.env.GRAPHQL_PORT) },
  context: async ({ req }) => {
    const token = req.headers.authorization || ""
    let user: DecodedIdToken | undefined

    if (token) {
      try {
        user = await auth.verifyIdToken(token)
      } catch (e) {
        /* empty */
      }
    }

    return {
      auth,
      user,
    }
  },
}).then(({ url }) => console.log(`Server ready at port ${url}`))
