import { In } from "typeorm"
import { withFilter } from "graphql-subscriptions"
import type { ApolloContext } from ".."
import { chatRepository, userRepository } from "../../database"
import type { Resolvers, Subscription, SubscriptionNewChatArgs } from "../__generated__"
import { Chat } from "../../entities/Chat"
import { TextMessage } from "../../entities/TextMessage"
import { VoiceMessage } from "../../entities/VoiceMessage"
import { PictureMessage } from "../../entities/PictureMessage"
import pubsub, { CHAT_CREATED } from "../pubsub"

export default {
  ...["Chat", "PreviewChat"].reduce((acc, name) => {
    acc[name] = {
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
    }

    return acc
  }, {}),
  Query: {
    chat(_, { id }, { user }) {
      if (!user) return null

      return chatRepository.findOne({
        relations: ["members", "messages", "messages.author", "messages.chat"],
        where: { id },
      })
    },
    findUserChats(_, __, { user }) {
      if (!user) return []

      // TODO: find chats where id is in items.id. Select only the last message (where timeStamp is the greatest).
      // Also, return the number of unread messages
      // TODO: Now i have custom scalar Date which is a Number so there's no need to say +timeStamp in the Front-End
      // TODO: Changed some null / not-null values in the graphql schemas so check if there's excessive optional chaining
      // TODO: Change ID in mutations to can be null because user?.id from Firebase can be null

      return chatRepository
        .createQueryBuilder("chat")
        .leftJoinAndSelect("chat.members", "member")
        .leftJoinAndSelect("chat.messages", "message")
        .leftJoinAndSelect("message.author", "author")
        .leftJoin("chat.messages", "next_message", "message.timeStamp < next_message.timeStamp")
        .where((qb) => {
          const subQuery = qb
            .subQuery()
            .select("chat.id")
            .from(Chat, "chat")
            .innerJoin("chat.members", "member")
            .where("member.firebaseId = :userId", { userId: user.uid })
            .getQuery()

          return `chat.id IN ${subQuery}`
        })
        .andWhere("next_message.id IS NULL")
        .loadRelationCountAndMap("chat.newMessagesCount", "chat.messages", "message", (qb) =>
          qb
            .innerJoin("message.author", "author")
            .andWhere("message.read = FALSE AND author.firebaseId <> :userId", { userId: user.uid })
            .groupBy("message.id"),
        )
        .groupBy("chat.id, member.id, message.id, author.id")
        .getMany()
    },
  },
  Mutation: {
    async createChat(_, { members }, { user, pubsub }) {
      if (!user) return null

      const existedChat = await chatRepository
        .createQueryBuilder("chat")
        .innerJoin("chat.members", "member")
        .where("member.firebaseId IN (:...members)", { members })
        .groupBy("chat.id")
        .having("COUNT(DISTINCT member.firebaseId) = :count", { count: members.length })
        .getOne()

      if (existedChat) {
        return chatRepository.findOne({
          relations: ["members", "messages", "messages.author"],
          where: { id: existedChat.id },
        })
      }

      const membersFromDb = await userRepository.findBy({ firebaseId: In(members) })
      const chat = new Chat()

      chat.members = membersFromDb
      chat.messages = []

      const savedChat = await chatRepository.save(chat)

      await pubsub.publish(CHAT_CREATED, {
        newChat: {
          ...savedChat,
          newMessagesCount: 0,
        },
      })

      return savedChat
    },
  },
  Subscription: {
    newChat: {
      subscribe: (_, args: SubscriptionNewChatArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(CHAT_CREATED),
          (payload: Pick<Subscription, "newChat">) => {
            return payload.newChat.members.some((member) => member.firebaseId === args.userId)
          },
        ),
      }),
    },
  },
} as Resolvers<ApolloContext>
