import { Raw } from "typeorm"
import { withFilter } from "graphql-subscriptions"
import { userRepository } from "../../database"
import type { ApolloContext } from ".."
import { emailRegexp } from "../../utils"
import type { Resolvers, Subscription, SubscriptionOnlineStatusArgs } from "../__generated__"
import { User } from "../../entities/User"
import pubsub, { EVENT } from "../pubsub"

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
    findUser(_, { payload }, { user }) {
      if (!user) return null

      const isEmail = emailRegexp.test(payload)

      return userRepository.findBy({
        [isEmail ? "email" : "displayName"]: Raw(
          (alias) => `LOWER(${alias}) Like '${payload.toLowerCase()}%'`,
        ),
      })
    },
  },
  Mutation: {
    createUser(_, { user }) {
      const newUser = new User(user.uid, user.displayName, user.email, user.photoURL)

      return userRepository.save(newUser)
    },
    async changeOnlineStatus(_, { status }, { user }) {
      if (!user) return null

      const foundUser = await userRepository.findOne({
        relations: ["chats", "chats.members"],
        where: { firebaseId: user.uid },
      })
      foundUser.online = status

      pubsub.publish(EVENT.ONLINE_STATUS_CHANGE, {
        onlineStatus: foundUser,
      })

      return userRepository.save(foundUser)
    },
  },
  Subscription: {
    onlineStatus: {
      subscribe: (_, args: SubscriptionOnlineStatusArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(EVENT.ONLINE_STATUS_CHANGE),
          (payload: Pick<Subscription, "onlineStatus">) => {
            return payload.onlineStatus.chats.some((chat) =>
              chat.members.some((member) => member.firebaseId === args.userId),
            )
          },
        ),
      }),
    },
  },
} as Resolvers<ApolloContext>
