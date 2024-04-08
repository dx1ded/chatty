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
