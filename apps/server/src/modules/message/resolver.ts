import type { ApolloContext } from ".."
import {
  chatRepository,
  pictureMessageRepository,
  textMessageRepository,
  userRepository,
  voiceMessageRepository,
} from "../../database"
import { TextMessage } from "../../entities/TextMessage"
import type { Resolvers } from "../types"

export default {
  Mutation: {
    async createTextMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOne({ where: { firebaseId: user.uid } })
      const chat = await chatRepository.findOne({ where: { id: message.meta.chat } })
      const newTextMessage = new TextMessage(message.text, author, chat)

      return textMessageRepository.save(newTextMessage)
    },
    async createVoiceMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOne({ where: { firebaseId: user.uid } })
      const chat = await chatRepository.findOne({ where: { id: message.meta.chat } })
      const newTextMessage = new TextMessage(message.voiceUrl, author, chat)

      return voiceMessageRepository.save(newTextMessage)
    },
    async createPictureMessage(_, { message }, { user }) {
      if (!user) return null

      const author = await userRepository.findOne({ where: { firebaseId: user.uid } })
      const chat = await chatRepository.findOne({ where: { id: message.meta.chat } })
      const newTextMessage = new TextMessage(message.imageUrl, author, chat)

      return pictureMessageRepository.save(newTextMessage)
    },
  },
} as Resolvers<ApolloContext>
