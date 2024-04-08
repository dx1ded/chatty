import { gql } from "__generated__"

export const SEND_TEXT_MESSAGE = gql(`
  mutation CreateTextMessage($message: TextMessageInput!) {
    createTextMessage(message: $message) {
      ...MessageFields
    }
  }
`)
