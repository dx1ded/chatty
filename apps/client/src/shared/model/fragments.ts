import { gql } from "__generated__"

export const MESSAGE_FIELDS = gql(`
  fragment MessageFields on Message {
    __typename
    id
    author {
      displayName
      firebaseId
      online
      photoURL
    }
    chat {
      id
    }
    read
    timeStamp

    ... on TextMessage {
      text
    }

    ... on VoiceMessage {
      voiceUrl
    }

    ... on PictureMessage {
      imageUrl
    }
  }
`)

export const CHAT_FIELDS = gql(`
  fragment ChatFields on Chat {
    __typename
    id
    members {
      firebaseId
      displayName
      online
      photoURL
    }
    messages {
      ...MessageFields
    }
  }
`)

export const PREVIEW_CHAT_FIELDS = gql(`
  fragment PreviewChatFields on PreviewChat {
    id
    newMessagesCount
    members {
      firebaseId
      photoURL
      online
      displayName
    }
    messages {
      __typename
      timeStamp
      read
      author {
        firebaseId
        online
        photoURL
        displayName
      }

      ... on TextMessage {
        text
      }
    }
  }
`)
