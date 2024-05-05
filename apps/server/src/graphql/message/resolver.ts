import { withFilter } from "graphql-subscriptions"
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
import pubsub, { NEW_MESSAGE } from "../pubsub"
import type { Subscription, Resolvers, SubscriptionNewMessageArgs } from "../__generated__"

export default {
  Query: {
    async messages(_, { chatId, skip = 0, take = 15 }, { user }) {
      if (!user) return null

      const messages = await messageRepository
        .createQueryBuilder("message")
        .leftJoinAndSelect("message.chat", "chat")
        .leftJoinAndSelect("message.author", "author")
        .orderBy("message.timeStamp", "DESC")
        .where("chat.id = :chatId", { chatId })
        .skip(skip * take)
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
    async createTextMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOneBy({ firebaseId: user.uid })
      const chat = await chatRepository.findOne({
        relations: ["members"],
        where: { id: message.meta.chat },
      })

      const newTextMessage = new TextMessage(message.text, author, chat)
      const savedTextMessage = await textMessageRepository.save(newTextMessage)

      pubsub.publish(NEW_MESSAGE, {
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
      const chat = await chatRepository.findOneBy({ id: message.meta.chat })

      const newVoiceMessage = new VoiceMessage(message.voiceUrl, author, chat)
      const savedVoiceMessage = await voiceMessageRepository.save(newVoiceMessage)

      pubsub.publish(NEW_MESSAGE, {
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
      const chat = await chatRepository.findOneBy({ id: message.meta.chat })

      const newPictureMessage = new PictureMessage(message.imageUrl, author, chat)
      const savedPictureMessage = await pictureMessageRepository.save(newPictureMessage)

      pubsub.publish(NEW_MESSAGE, {
        newMessage: {
          __typename: "PictureMessage",
          ...savedPictureMessage,
        },
      })

      return savedPictureMessage
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_, args: SubscriptionNewMessageArgs) => ({
        [Symbol.asyncIterator]: withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          (payload: Pick<Subscription, "newMessage">) => {
            return payload.newMessage.chat.members.some((member) => member.firebaseId === args.userId)
          },
        ),
      }),
    },
  },
} as Resolvers<ApolloContext>
