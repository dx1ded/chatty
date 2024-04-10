import "reflect-metadata"
import "dotenv/config"
import { createServer } from "http"
import { WebSocketServer } from "ws"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { useServer } from "graphql-ws/lib/use/ws"

import { initializeApp, cert } from "firebase-admin/app"
import { getAuth, type DecodedIdToken } from "firebase-admin/auth"
import { schema } from "./modules"
import pubsub from "./modules/pubsub"
import firebaseCredentials from "./credentials"

async function start() {
  const app = express()
  const httpServer = createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  })

  const firebase = initializeApp({
    credential: cert(firebaseCredentials),
  })
  const auth = getAuth(firebase)

  const serverCleanup = useServer(
    {
      schema,
    },
    wsServer,
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    "/graphql",
    bodyParser.json(),
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization as string
        let user: DecodedIdToken | undefined

        if (token) {
          user = await auth.verifyIdToken(token)
        }

        return {
          auth,
          user,
          pubsub,
        }
      },
    }),
  )

  httpServer.listen(Number(process.env.GRAPHQL_PORT), () => {
    console.log(`Server is listening port ${process.env.GRAPHQL_PORT}`)
  })
}

start()
