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

export const FIND_CONTACTS = gql(`
  query FindContacts {
    findContacts {
      firebaseId
      displayName
      photoURL
      online
      chats {
      id
      members {
        firebaseId
      }
    }
    }
  }
`)

export const CHANGE_ONLINE_STATUS = gql(`
  mutation ChangeOnlineStatus($status: Boolean!) {
    changeOnlineStatus(status: $status) {
      firebaseId
    }
  }
`)

export const ONLINE_STATUS_SUBSCRIPTION = gql(`
  subscription OnlineStatus($userId: ID!) {
    onlineStatus(userId: $userId) {
      firebaseId
      online
    }
  }
`)
