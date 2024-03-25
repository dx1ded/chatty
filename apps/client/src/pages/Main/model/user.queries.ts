import { gql } from "@apollo/client"

export const FIND_USER = gql`
  query FindUser($payload: String!) {
    findUser(payload: $payload) {
      firebaseId
      displayName
      photoURL
    }
  }
`
