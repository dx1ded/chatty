import type { ApolloContext } from ".."
import { Resolvers, QueryIsEmailUsedArgs } from "../types"

export default {
  Query: {
    async isEmailUsed(_, { email }: QueryIsEmailUsedArgs, { auth }) {
      let exists = false

      try {
        await auth.getUserByEmail(email)
        exists = true
      } catch (__) {
        console.log("Doesn't exist")
      }

      return exists
    },
  },
} as Resolvers<ApolloContext>
