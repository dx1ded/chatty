import { withFilter } from "graphql-subscriptions"
import { In, Not } from "typeorm"
import { GraphQLError } from "graphql"
import type { ApolloContext } from ".."
import {
  chatRepository,
  messageRepository,
  pictureMessageRepository,
  textMessageRepository,
  userRepository,
  voiceMessageRepository,
} from "../../database"
import { TextMessage } from "../../entities/TextMessage"
import { VoiceMessage } from "../../entities/VoiceMessage"
import { PictureMessage } from "../../entities/PictureMessage"
import pubsub, { EVENT } from "../pubsub"
import type {
  Subscription,
  Resolvers,
  SubscriptionNewMessageArgs,
  SubscriptionMessageReadArgs,
} from "../__generated__"

export default {
  Query: {
    async messages(_, { chatId, take = 15, skip = 0 }, { user }) {
      if (!user) return null

      const messages = await messageRepository
        .createQueryBuilder("message")
        .leftJoinAndSelect("message.chat", "chat")
        .leftJoinAndSelect("message.author", "author")
        .orderBy("message.timeStamp", "DESC")
        .where("chat.id = :chatId", { chatId })
        .skip(skip)
        .take(take)
        .getMany()

      return messages.map((message) => {
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
  Mutation: {
    async readMessages(_, { messageIds }, { user }) {
      if (!user) return null

      const messages = await messageRepository.find({
        relations: ["author", "chat", "chat.members"],
        where: {
          id: In(messageIds),
          chat: {
            members: {
              firebaseId: user.uid,
            },
          },
          author: {
            firebaseId: Not(user.uid),
          },
        },
      })

      if (messages.length !== messageIds.length) {
        throw new GraphQLError("Some of the messages don't seem to be sent by another person in the chat")
      }

      const readMessages = messages.map((message) => {
        if (message instanceof TextMessage) {
          return { __typename: "TextMessage", ...message, read: true }
        }
        if (message instanceof VoiceMessage) {
          return { __typename: "VoiceMessage", ...message, read: true }
        }
        if (message instanceof PictureMessage) {
          return { __typename: "PictureMessage", ...message, read: true }
        }

        return message
      })

      await messageRepository.save(readMessages)

      pubsub.publish(EVENT.MESSAGE_READ, {
        messageRead: readMessages,
      })

      return readMessages
    },
    async createTextMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOneBy({ firebaseId: user.uid })
      const chat = await chatRepository.findOne({
        relations: ["members"],
        where: { id: message.meta.chat },
      })

      const newTextMessage = new TextMessage(message.text, author, chat)
      const savedTextMessage = await textMessageRepository.save(newTextMessage)

      pubsub.publish(EVENT.NEW_MESSAGE, {
        newMessage: {
          __typename: "TextMessage",
          ...savedTextMessage,
        },
      })

      return savedTextMessage
    },
    async createVoiceMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOneBy({ firebaseId: user.uid })
      const chat = await chatRepository.findOne({
        relations: ["members"],
        where: { id: message.meta.chat },
      })

      const newVoiceMessage = new VoiceMessage(message.voiceUrl, author, chat)
      const savedVoiceMessage = await voiceMessageRepository.save(newVoiceMessage)

      pubsub.publish(EVENT.NEW_MESSAGE, {
        newMessage: {
          __typename: "VoiceMessage",
          ...newVoiceMessage,
        },
      })

      return savedVoiceMessage
    },
    async createPictureMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOneBy({ firebaseId: user.uid })
      const chat = await chatRepository.findOne({
        relations: ["members"],
        where: { id: message.meta.chat },
      })

      const newPictureMessages = message.imagesUrl.map(
        (imageUrl) => new PictureMessage(imageUrl, author, chat),
      )
      const savedPictureMessage = await pictureMessageRepository.save(newPictureMessages)

      savedPictureMessage.forEach((newMessage) =>
        pubsub.publish(EVENT.NEW_MESSAGE, {
          newMessage: {
            __typename: "PictureMessage",
            ...newMessage,
          },
        }),
      )

      return savedPictureMessage
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_, args: SubscriptionNewMessageArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(EVENT.NEW_MESSAGE),
          (payload: Pick<Subscription, "newMessage">) => {
            return payload.newMessage.chat.members.some((member) => member.firebaseId === args.userId)
          },
        ),
      }),
    },
    messageRead: {
      subscribe: (_, args: SubscriptionMessageReadArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(EVENT.MESSAGE_READ),
          (payload: Pick<Subscription, "messageRead">) => {
            return payload.messageRead.every((message) => message.author.firebaseId === args.userId)
          },
        ),
      }),
    },
  },
} as Resolvers<ApolloContext>
