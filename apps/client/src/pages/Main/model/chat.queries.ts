import { gql } from "__generated__"

export const GET_CHAT = gql(`
  query GetChat($chatId: ID!) {
    chat(id: $chatId) {
      ...ChatFields
    }
  }
`)

export const GET_CHAT_LIST = gql(`
  query GetChatList($userId: ID!) {
    findUserChats(userId: $userId) {
      ...ChatFields
    }
  }
`)

export const CHAT_LIST_SUBSCRIPTION = gql(`
  subscription ChatList($userId: ID!) {
    newChat(userId: $userId) {
      ...ChatFields
    }
  }
`)
