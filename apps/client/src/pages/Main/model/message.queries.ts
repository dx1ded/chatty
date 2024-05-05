import { gql } from "__generated__"

export const GET_MESSAGES = gql(`
  query GetMessages($chatId: ID!, $take: Int, $skip: Int) {
    messages(chatId: $chatId, take: $take, skip: $skip) {
      ...MessageFields
    }
  }
`)

export const SEND_TEXT_MESSAGE = gql(`
  mutation CreateTextMessage($message: TextMessageInput!) {
    createTextMessage(message: $message) {
      ...MessageFields
    }
  }
`)

export const MESSAGE_SUBSCRIPTION = gql(`
  subscription Message($userId: ID!) {
    newMessage(userId: $userId) {
      ...MessageFields
    }
  }
`)
