import { gql } from "@apollo/client"

export const IS_EMAIL_USED = gql`
  query IsEmailUsed($email: String!) {
    isEmailUsed(email: $email)
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      firebaseId
    }
  }
`
