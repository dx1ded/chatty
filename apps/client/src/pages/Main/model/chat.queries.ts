import { gql } from "@apollo/client"
import { CHAT_FIELDS } from "shared/model"

export const GET_CHAT = gql`
  ${CHAT_FIELDS}

  query Chat($chatId: ID!) {
    chat(id: $chatId) {
      ...ChatFields
    }
  }
`

export const GET_CHATS = gql`
  ${CHAT_FIELDS}

  query GetUserChats($userId: ID!) {
    findUserChats(userId: $userId) {
      ...ChatFields
    }
  }
`

export const CHATS_SUBSCRIPTION = gql`
  ${CHAT_FIELDS}

  subscription ChatList($userId: ID!) {
    chatList(userId: $userId) {
      ...ChatFields
    }
  }
`
