import { gql } from "@apollo/client"

export const IS_EMAIL_USED = gql`
  query IsEmailUsed($email: String!) {
    isEmailUsed(email: $email)
  }
`
