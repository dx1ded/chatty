import { Raw, In } from "typeorm"
import { withFilter } from "graphql-subscriptions"
import type { ApolloContext } from ".."
import { chatRepository, userRepository } from "../../database"
import type { Message, Resolvers, SubscriptionChatArgs, SubscriptionChatListArgs } from "../types"
import { Chat } from "../../entities/Chat"
import { TextMessage } from "../../entities/TextMessage"
import { VoiceMessage } from "../../entities/VoiceMessage"
import { PictureMessage } from "../../entities/PictureMessage"
import pubsub, { CHAT_CREATED, MESSAGE_SENT } from "../pubsub"

export default {
  Chat: {
    messages(parent) {
      return parent.messages.map((message) => {
        if (message instanceof TextMessage) {
          return { __typename: "TextMessage", ...message }
        }
        if (message instanceof VoiceMessage) {
          return { __typename: "VoiceMessage", ...message }
        }
        if (message instanceof PictureMessage) {
          return { __typename: "PictureMessage", ...message }
        }

        return message
      })
    },
  },
  Query: {
    chat(_, { id }, { user }) {
      if (!user) return null

      return chatRepository.findOne({ where: { id } })
    },
    findUserChats(_, __, { user }) {
      if (!user) return []

      return chatRepository.find({
        where: {
          members: Raw((alias) => `:id = ANY(${alias})`, { id: user.uid }),
        },
      })
    },
  },
  Mutation: {
    async createChat(_, { members }, { user, pubsub }) {
      if (!user) return null

      const chatExists = await chatRepository.findOne({
        relations: ["members", "messages"],
        where: {
          members: {
            firebaseId: In(members),
          },
        },
      })

      if (chatExists) return chatExists

      const membersFromDb = await userRepository.findBy({ firebaseId: In(members) })

      const chat = new Chat()

      chat.members = membersFromDb
      chat.messages = []

      const savedChat = await chatRepository.save(chat)

      await pubsub.publish(CHAT_CREATED, savedChat)

      return savedChat
    },
  },
  Subscription: {
    chatList: {
      subscribe: () => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator([CHAT_CREATED]),
          (payload: Chat, variables: SubscriptionChatListArgs) => {
            return payload.members.some((member) => member.firebaseId === variables.userId)
          },
        ),
      }),
    },
    chat: {
      subscribe: () => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator([MESSAGE_SENT]),
          (payload: Message, variables: SubscriptionChatArgs) => {
            return payload.chat.id === variables.id
          },
        ),
      }),
    },
  },
} as Resolvers<ApolloContext>
