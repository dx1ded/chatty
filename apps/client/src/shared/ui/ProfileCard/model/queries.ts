import { gql } from "@apollo/client"
import { CHAT_FIELDS } from "shared/model"

export const CREATE_CHAT = gql`
  ${CHAT_FIELDS}

  mutation CreateChat($members: [ID!]!) {
    createChat(members: $members) {
      ...ChatFields
    }
  }
`
