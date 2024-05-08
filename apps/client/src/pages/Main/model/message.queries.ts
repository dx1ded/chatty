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

export const NEW_MESSAGE_SUBSCRIPTION = gql(`
  subscription NewMessage($userId: ID!) {
    newMessage(userId: $userId) {
      ...MessageFields
    }
  }
`)

export const MESSAGE_READ_SUBSCRIPTION = gql(`
  subscription MessageRead($userId: ID!) {
    messageRead(userId: $userId) {
      id
    }
  }
`)

export const READ_MESSAGES = gql(`
  mutation ReadMessages($messageIds: [ID!]!) {
    readMessages(messageIds: $messageIds) {
      id
    }
  }
`)
