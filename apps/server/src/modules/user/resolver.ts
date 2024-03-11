import { userRepository } from "../../database"
import type { ApolloContext } from ".."
import type { Resolvers } from "../types"
import { User } from "../../entities/User"

export default {
  Query: {
    async isEmailUsed(_, { email }, { auth }) {
      let exists = false

      try {
        await auth.getUserByEmail(email)
        exists = true
      } catch (__) {
        /* Catch */
      }

      return exists
    },
  },
  Mutation: {
    createUser(_, { user }) {
      const newUser = new User(user.uid, user.displayName, user.email, user.photoURL)

      return userRepository.save(newUser)
    },
  },
} as Resolvers<ApolloContext>
