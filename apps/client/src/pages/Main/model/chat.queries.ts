import { gql } from "__generated__"

export const GET_CHAT = gql(`
  query Chat($chatId: ID!) {
    chat(id: $chatId) {
      ...ChatFields
    }
  }
`)

export const GET_CHATS = gql(`
  query GetUserChats($userId: ID!) {
    findUserChats(userId: $userId) {
      ...ChatFields
    }
  }
`)

export const CHATS_SUBSCRIPTION = gql(`
  subscription ChatList($userId: ID!) {
    chatList(userId: $userId) {
      ...ChatFields
    }
  }
`)
