import { gql } from "__generated__"

export const CREATE_CHAT = gql(`
  mutation CreateChat($members: [ID!]!) {
    createChat(members: $members) {
      ...ChatFields
    }
  }
`)
