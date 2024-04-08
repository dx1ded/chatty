import { In } from "typeorm"
import { withFilter } from "graphql-subscriptions"
import type { ApolloContext } from ".."
import { chatRepository, userRepository } from "../../database"
import type {
  Message,
  Resolvers,
  Subscription,
  SubscriptionChatArgs,
  SubscriptionChatListArgs,
} from "../__generated__"
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
    async chat(_, { id }, { user }) {
      if (!user) return null

      const a = await chatRepository.findOne({
        relations: ["members", "messages"],
        where: { id },
      })

      console.log(a)

      return a
    },
    async findUserChats(_, __, { user }) {
      if (!user) return []

      // TODO: make it with one query

      const items = await chatRepository.findBy({
        members: {
          firebaseId: user.uid,
        },
      })

      return chatRepository.find({
        relations: ["members", "messages"],
        where: {
          id: In(items.map((item) => item.id)),
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

      await pubsub.publish(CHAT_CREATED, {
        chatList: savedChat,
      })

      return savedChat
    },
  },
  Subscription: {
    chatList: {
      subscribe: (_, args: SubscriptionChatListArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(CHAT_CREATED),
          (payload: Pick<Subscription, "chatList">) => {
            return payload.chatList.members.some((member) => member.firebaseId === args.userId)
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
