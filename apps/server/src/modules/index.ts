import { join } from "node:path"
import { ApolloServerOptions } from "@apollo/server"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeResolvers } from "@graphql-tools/merge"

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = loadFilesSync(join(__dirname, "./**/resolvers.js"))

export const apolloServerOptions: ApolloServerOptions<object> = {
  typeDefs,
  resolvers: mergeResolvers(resolvers),
}
