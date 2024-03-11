import { Raw } from "typeorm"
import type { ApolloContext } from ".."
import { chatRepository } from "../../database"
import type { Resolvers } from "../types"
import { Chat } from "../../entities/Chat"
import { TextMessage } from "../../entities/TextMessage"
import { VoiceMessage } from "../../entities/VoiceMessage"
import { PictureMessage } from "../../entities/PictureMessage"

export default {
  Query: {
    chat(_, { id }, { user }) {
      if (!user) return null

      return chatRepository.find({ where: { id } })
    },
    findUserChats(_, __, { user }) {
      if (!user) return null

      return chatRepository.find({
        where: {
          members: Raw((alias) => `:id = ANY(${alias})`, { id: user.uid }),
        },
      })
    },
  },
  Mutation: {
    createChat(_, { members }, { user }) {
      if (!user) return null

      const newChat = new Chat(members)

      return chatRepository.save(newChat)
    },
  },
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
} as Resolvers<ApolloContext>
