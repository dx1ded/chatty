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

      return chatRepository.findOne({
        relations: ["members", "messages", "messages.author", "messages.chat"],
        where: { id },
      })
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
        relations: ["members", "messages", "messages.author", "messages.chat"],
        where: {
          id: In(items.map((item) => item.id)),
        },
      })
    },
  },
  Mutation: {
    async createChat(_, { members }, { user, pubsub }) {
      if (!user) return null

      // const queryBuilder = chatRepository.createQueryBuilder("chat")
      // members.forEach((member, index) => {
      //   const alias = `member${index}` // Create dynamic alias
      //   queryBuilder
      //     .innerJoin(`chat.members`, alias)
      //     .andWhere(`${alias}.firebaseId = :memberId_${index}`, { [`memberId_${index}`]: member })
      // })
      // const chatExists = await queryBuilder
      //   .groupBy("chat.id") // Ensure uniqueness of chat
      //   .having(`COUNT(DISTINCT member0.id) = :totalMembers`, { totalMembers: members.length })
      //   .getOne()

      // console.log(chatExists)
      const chatExists = await chatRepository.findOne({
        relations: ["members", "messages"],
        where: {
          members: {
            firebaseId: In(members),
          },
        },
      })

      // const chatExists = await chatRepository
      //   .createQueryBuilder("chat")
      //   .innerJoinAndSelect("chat.messages", "message")
      //   .innerJoinAndSelect("message.author", "author")
      //   .innerJoinAndSelect("message.chat", "messageChat")
      //   .innerJoinAndSelect("chat.members", "member")
      //   .where("member.firebaseId IN (:...members)", { members })
      //   .groupBy("chat.id, message.id, author.id, messageChat.id, member.id")
      //   .having("COUNT(member.id) = :count", { count: members.length })
      //   .getOne()

      if (chatExists) return chatExists

      const membersFromDb = await userRepository.findBy({ firebaseId: In(members) })
      const chat = new Chat()

      chat.members = membersFromDb
      chat.messages = []

      const savedChat = await chatRepository.save(chat)

      await pubsub.publish(CHAT_CREATED, {
        newChat: savedChat,
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
