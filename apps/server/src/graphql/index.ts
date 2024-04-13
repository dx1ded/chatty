import { join } from "node:path"

import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { loadFilesSync } from "@graphql-tools/load-files"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"
import type { PubSub } from "graphql-subscriptions"
import type { Auth, DecodedIdToken } from "firebase-admin/auth"
import { dateScalar } from "./__scalars__/Date"

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = loadFilesSync(join(__dirname, "./**/resolver.js"))

export interface ApolloContext {
  auth: Auth
  user: DecodedIdToken | undefined
  pubsub: PubSub
}

export const schema = makeExecutableSchema<ApolloContext>({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: {
    ...mergeResolvers(resolvers),
    Date: dateScalar,
  },
})
