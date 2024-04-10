import { withFilter } from "graphql-subscriptions"
import type { ApolloContext } from ".."
import {
  chatRepository,
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
