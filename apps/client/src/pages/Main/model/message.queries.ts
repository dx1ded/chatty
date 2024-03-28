import { gql } from "@apollo/client"
import { MESSAGE_FIELDS } from "shared/model/fragments"

export const SEND_TEXT_MESSAGE = gql`
  ${MESSAGE_FIELDS}

  mutation CreateTextMessage($message: TextMessageInput!) {
    createTextMessage(message: $message) {
      ...MessageFields
    }
  }
`
