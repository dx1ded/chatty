import "dotenv/config"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { apolloServerOptions } from "./modules"

const server = new ApolloServer(apolloServerOptions)

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) =>
  console.log(`Server ready at port ${url}`),
)
