import type { ApolloContext } from ".."
import {
  chatRepository,
  pictureMessageRepository,
  textMessageRepository,
  userRepository,
  voiceMessageRepository,
} from "../../database"
import { TextMessage } from "../../entities/TextMessage"
import pubsub, { MESSAGE_SENT } from "../pubsub"
import type { Resolvers } from "../types"

export default {
  Mutation: {
    async createTextMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOne({ where: { firebaseId: user.uid } })
      const chat = await chatRepository.findOne({ where: { id: message.meta.chat } })

      const newTextMessage = new TextMessage(message.text, author, chat)
      const savedTextMessage = await textMessageRepository.save(newTextMessage)

      pubsub.publish(MESSAGE_SENT, savedTextMessage)

      return savedTextMessage
    },
    async createVoiceMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOne({ where: { firebaseId: user.uid } })
      const chat = await chatRepository.findOne({ where: { id: message.meta.chat } })

      const newVoiceMessage = new TextMessage(message.voiceUrl, author, chat)
      const savedVoiceMessage = await voiceMessageRepository.save(newVoiceMessage)

      pubsub.publish(MESSAGE_SENT, savedVoiceMessage)

      return savedVoiceMessage
    },
    async createPictureMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOne({ where: { firebaseId: user.uid } })
      const chat = await chatRepository.findOne({ where: { id: message.meta.chat } })

      const newPictureMessage = new TextMessage(message.imageUrl, author, chat)
      const savedPictureMessage = await pictureMessageRepository.save(newPictureMessage)

      pubsub.publish(MESSAGE_SENT, savedPictureMessage)

      return savedPictureMessage
    },
  },
} as Resolvers<ApolloContext>
