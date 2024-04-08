import { gql } from "__generated__"

export const FIND_USER = gql(`
  query FindUser($payload: String!) {
    findUser(payload: $payload) {
      firebaseId
      displayName
      photoURL
    }
  }
`)
