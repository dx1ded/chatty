/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query IsEmailUsed($email: String!) {\n    isEmailUsed(email: $email)\n  }\n": types.IsEmailUsedDocument,
    "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      firebaseId\n    }\n  }\n": types.CreateUserDocument,
    "\n  query GetChat($chatId: ID!) {\n    chat(id: $chatId) {\n      ...ChatFields\n    }\n  }\n": types.GetChatDocument,
    "\n  query GetChatList($userId: ID!) {\n    findUserChats(userId: $userId) {\n      ...PreviewChatFields\n    }\n  }\n": types.GetChatListDocument,
    "\n  subscription ChatList($userId: ID!) {\n    newChat(userId: $userId) {\n      ...PreviewChatFields\n    }\n  }\n": types.ChatListDocument,
    "\n  query GetMessages($chatId: ID!, $take: Int, $skip: Int) {\n    messages(chatId: $chatId, take: $take, skip: $skip) {\n      ...MessageFields\n    }\n  }\n": types.GetMessagesDocument,
    "\n  mutation CreateTextMessage($message: TextMessageInput!) {\n    createTextMessage(message: $message) {\n      ...MessageFields\n    }\n  }\n": types.CreateTextMessageDocument,
    "\n  subscription Message($userId: ID!) {\n    newMessage(userId: $userId) {\n      ...MessageFields\n    }\n  }\n": types.MessageDocument,
    "\n  query FindUser($payload: String!) {\n    findUser(payload: $payload) {\n      firebaseId\n      displayName\n      photoURL\n    }\n  }\n": types.FindUserDocument,
    "\n  fragment MessageFields on Message {\n    __typename\n    id\n    author {\n      displayName\n      firebaseId\n      online\n      photoURL\n    }\n    chat {\n      id\n    }\n    read\n    timeStamp\n\n    ... on TextMessage {\n      text\n    }\n\n    ... on VoiceMessage {\n      voiceUrl\n    }\n\n    ... on PictureMessage {\n      imageUrl\n    }\n  }\n": types.MessageFieldsFragmentDoc,
    "\n  fragment ChatFields on Chat {\n    __typename\n    id\n    members {\n      firebaseId\n      displayName\n      online\n      photoURL\n    }\n    messages {\n      ...MessageFields\n    }\n  }\n": types.ChatFieldsFragmentDoc,
    "\n  fragment PreviewChatFields on PreviewChat {\n    id\n    newMessagesCount\n    members {\n      firebaseId\n      photoURL\n      online\n      displayName\n    }\n    messages {\n      __typename\n      timeStamp\n      read\n      author {\n        firebaseId\n        online\n        photoURL\n        displayName\n      }\n\n      ... on TextMessage {\n        text\n      }\n    }\n  }\n": types.PreviewChatFieldsFragmentDoc,
    "\n  mutation CreateChat($members: [ID!]!) {\n    createChat(members: $members) {\n      ...ChatFields\n    }\n  }\n": types.CreateChatDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IsEmailUsed($email: String!) {\n    isEmailUsed(email: $email)\n  }\n"): (typeof documents)["\n  query IsEmailUsed($email: String!) {\n    isEmailUsed(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      firebaseId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      firebaseId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetChat($chatId: ID!) {\n    chat(id: $chatId) {\n      ...ChatFields\n    }\n  }\n"): (typeof documents)["\n  query GetChat($chatId: ID!) {\n    chat(id: $chatId) {\n      ...ChatFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetChatList($userId: ID!) {\n    findUserChats(userId: $userId) {\n      ...PreviewChatFields\n    }\n  }\n"): (typeof documents)["\n  query GetChatList($userId: ID!) {\n    findUserChats(userId: $userId) {\n      ...PreviewChatFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription ChatList($userId: ID!) {\n    newChat(userId: $userId) {\n      ...PreviewChatFields\n    }\n  }\n"): (typeof documents)["\n  subscription ChatList($userId: ID!) {\n    newChat(userId: $userId) {\n      ...PreviewChatFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMessages($chatId: ID!, $take: Int, $skip: Int) {\n    messages(chatId: $chatId, take: $take, skip: $skip) {\n      ...MessageFields\n    }\n  }\n"): (typeof documents)["\n  query GetMessages($chatId: ID!, $take: Int, $skip: Int) {\n    messages(chatId: $chatId, take: $take, skip: $skip) {\n      ...MessageFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateTextMessage($message: TextMessageInput!) {\n    createTextMessage(message: $message) {\n      ...MessageFields\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTextMessage($message: TextMessageInput!) {\n    createTextMessage(message: $message) {\n      ...MessageFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Message($userId: ID!) {\n    newMessage(userId: $userId) {\n      ...MessageFields\n    }\n  }\n"): (typeof documents)["\n  subscription Message($userId: ID!) {\n    newMessage(userId: $userId) {\n      ...MessageFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindUser($payload: String!) {\n    findUser(payload: $payload) {\n      firebaseId\n      displayName\n      photoURL\n    }\n  }\n"): (typeof documents)["\n  query FindUser($payload: String!) {\n    findUser(payload: $payload) {\n      firebaseId\n      displayName\n      photoURL\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MessageFields on Message {\n    __typename\n    id\n    author {\n      displayName\n      firebaseId\n      online\n      photoURL\n    }\n    chat {\n      id\n    }\n    read\n    timeStamp\n\n    ... on TextMessage {\n      text\n    }\n\n    ... on VoiceMessage {\n      voiceUrl\n    }\n\n    ... on PictureMessage {\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  fragment MessageFields on Message {\n    __typename\n    id\n    author {\n      displayName\n      firebaseId\n      online\n      photoURL\n    }\n    chat {\n      id\n    }\n    read\n    timeStamp\n\n    ... on TextMessage {\n      text\n    }\n\n    ... on VoiceMessage {\n      voiceUrl\n    }\n\n    ... on PictureMessage {\n      imageUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ChatFields on Chat {\n    __typename\n    id\n    members {\n      firebaseId\n      displayName\n      online\n      photoURL\n    }\n    messages {\n      ...MessageFields\n    }\n  }\n"): (typeof documents)["\n  fragment ChatFields on Chat {\n    __typename\n    id\n    members {\n      firebaseId\n      displayName\n      online\n      photoURL\n    }\n    messages {\n      ...MessageFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment PreviewChatFields on PreviewChat {\n    id\n    newMessagesCount\n    members {\n      firebaseId\n      photoURL\n      online\n      displayName\n    }\n    messages {\n      __typename\n      timeStamp\n      read\n      author {\n        firebaseId\n        online\n        photoURL\n        displayName\n      }\n\n      ... on TextMessage {\n        text\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PreviewChatFields on PreviewChat {\n    id\n    newMessagesCount\n    members {\n      firebaseId\n      photoURL\n      online\n      displayName\n    }\n    messages {\n      __typename\n      timeStamp\n      read\n      author {\n        firebaseId\n        online\n        photoURL\n        displayName\n      }\n\n      ... on TextMessage {\n        text\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateChat($members: [ID!]!) {\n    createChat(members: $members) {\n      ...ChatFields\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChat($members: [ID!]!) {\n    createChat(members: $members) {\n      ...ChatFields\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;