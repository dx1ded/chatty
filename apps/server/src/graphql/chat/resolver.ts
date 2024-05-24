import { In } from "typeorm"
import { withFilter } from "graphql-subscriptions"
import type { ApolloContext } from ".."
import {
  chatRepository,
  pictureMessageRepository,
  textMessageRepository,
  userRepository,
  voiceMessageRepository,
} from "../../database"
import type {
  Resolvers,
  Subscription,
  SubscriptionChatDeletedArgs,
  SubscriptionNewChatArgs,
} from "../__generated__"
import { Chat } from "../../entities/Chat"
import { TextMessage } from "../../entities/TextMessage"
import { VoiceMessage } from "../../entities/VoiceMessage"
import { PictureMessage } from "../../entities/PictureMessage"
import pubsub, { EVENT } from "../pubsub"

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
    async chat(_, { id }, { user }) {
      if (!user) return null

      const chat = await chatRepository.findOne({
        relations: ["members"],
        where: { id },
      })

      chat.messages = []

      return chat
    },
    findUserChats(_, __, { user }) {
      if (!user) return []

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
            .andWhere("message.read = FALSE AND author.firebaseId <> :userId", { userId: user.uid }),
        )
        .groupBy("chat.id, member.id, message.id, author.id")
        .getMany()
    },
    async chatInfo(_, { id }, { user }) {
      if (!user) return null

      const textCount = await textMessageRepository.count({
        relations: ["chat"],
        where: {
          chat: {
            id,
          },
        },
      })

      const picturesCount = await pictureMessageRepository.count({
        relations: ["chat"],
        where: {
          chat: {
            id,
          },
        },
      })

      const voicesCount = await voiceMessageRepository.count({
        relations: ["chat"],
        where: {
          chat: {
            id,
          },
        },
      })

      const { createdAt } = await chatRepository.findOne({
        select: { createdAt: true },
        where: { id },
      })

      return {
        text: textCount,
        pictures: picturesCount,
        voices: voicesCount,
        createdAt,
      }
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
          relations: ["members", "messages", "messages.author", "messages.chat"],
          where: { id: existedChat.id },
        })
      }

      const membersFromDb = await userRepository.findBy({ firebaseId: In(members) })
      const chat = new Chat()

      chat.members = membersFromDb
      chat.messages = []

      const savedChat = await chatRepository.save(chat)

      await pubsub.publish(EVENT.CHAT_CREATED, {
        newChat: {
          ...savedChat,
          newMessagesCount: 0,
        },
      })

      return savedChat
    },
    async deleteChat(_, { id }, { user, pubsub }) {
      if (!user) return null

      /*
        Used only relation `members` because it's the only thing needed for the subscription.
        If needed something else for graphql return (like messages, message.author, etc) then put it in the `relations` prop
      */
      const chatToDelete = await chatRepository.findOne({
        relations: ["members"],
        where: { id },
      })

      await chatRepository.delete({ id: chatToDelete.id })
      await pubsub.publish(EVENT.CHAT_DELETED, { chatDeleted: chatToDelete })

      return chatToDelete
    },
  },
  Subscription: {
    newChat: {
      subscribe: (_, args: SubscriptionNewChatArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(EVENT.CHAT_CREATED),
          (payload: Pick<Subscription, "newChat">) =>
            payload.newChat.members.some((member) => member.firebaseId === args.userId),
        ),
      }),
    },
    chatDeleted: {
      subscribe: (_, args: SubscriptionChatDeletedArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(EVENT.CHAT_DELETED),
          (payload: Pick<Subscription, "chatDeleted">) =>
            payload.chatDeleted.members.some((member) => member.firebaseId === args.userId),
        ),
      }),
    },
  },
} as Resolvers<ApolloContext>
