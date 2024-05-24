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
      ...PreviewChatFields
    }
  }
`)

export const GET_CHAT_INFO = gql(`
  query ChatInfo($chatInfoId: ID!) {
    chatInfo(id: $chatInfoId) {
      createdAt
      pictures
      text
      voices
    }
  }
`)

export const DELETE_CHAT = gql(`
  mutation DeleteChat($deleteChatId: ID!) {
    deleteChat(id: $deleteChatId) {
      id
    }
  }
`)

export const NEW_CHAT_SUBSCRIPTION = gql(`
  subscription NewChat($userId: ID!) {
    newChat(userId: $userId) {
      ...PreviewChatFields
    }
  }
`)

export const CHAT_DELETED_SUBSCRIPTION = gql(`
  subscription ChatDeleted($userId: ID!) {
    chatDeleted(userId: $userId) {
      id
    }
  }
`)
