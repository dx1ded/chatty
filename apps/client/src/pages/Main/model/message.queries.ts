import { gql } from "__generated__"

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
