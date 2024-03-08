import { join } from "node:path"

import { ApolloServerOptions } from "@apollo/server"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"

import { type Auth, type DecodedIdToken } from "firebase-admin/auth"

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = loadFilesSync(join(__dirname, "./**/resolver.js"))

export interface ApolloContext {
  auth: Auth
  user: DecodedIdToken | undefined
}

export const apolloServerOptions: ApolloServerOptions<ApolloContext> = {
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers: mergeResolvers(resolvers),
}
