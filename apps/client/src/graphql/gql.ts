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
    "\n  \n\n  query Chat($chatId: ID!) {\n    chat(id: $chatId) {\n      ...ChatFields\n    }\n  }\n": types.ChatDocument,
    "\n  \n\n  query GetUserChats($userId: ID!) {\n    findUserChats(userId: $userId) {\n      ...ChatFields\n    }\n  }\n": types.GetUserChatsDocument,
    "\n  \n\n  subscription ChatList($userId: ID!) {\n    chatList(userId: $userId) {\n      ...ChatFields\n    }\n  }\n": types.ChatListDocument,
    "\n  query FindUser($payload: String!) {\n    findUser(payload: $payload) {\n      firebaseId\n      displayName\n      photoURL\n    }\n  }\n": types.FindUserDocument,
    "\n  fragment MessageFields on Message {\n    __typename\n    id\n    author {\n      displayName\n      firebaseId\n      online\n      photoURL\n    }\n    read\n    timeStamp\n\n    ... on TextMessage {\n      text\n    }\n\n    ... on VoiceMessage {\n      voiceUrl\n    }\n\n    ... on PictureMessage {\n      imageUrl\n    }\n  }\n": types.MessageFieldsFragmentDoc,
    "\n  \n\n  fragment ChatFields on Chat {\n    id\n    members {\n      firebaseId\n      displayName\n      online\n    }\n    messages {\n      ...MessageFields\n    }\n  }\n": types.ChatFieldsFragmentDoc,
    "\n  \n\n  mutation CreateChat($members: [ID!]!) {\n    createChat(members: $members) {\n      ...ChatFields\n    }\n  }\n": types.CreateChatDocument,
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
export function gql(source: "\n  \n\n  query Chat($chatId: ID!) {\n    chat(id: $chatId) {\n      ...ChatFields\n    }\n  }\n"): (typeof documents)["\n  \n\n  query Chat($chatId: ID!) {\n    chat(id: $chatId) {\n      ...ChatFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n\n  query GetUserChats($userId: ID!) {\n    findUserChats(userId: $userId) {\n      ...ChatFields\n    }\n  }\n"): (typeof documents)["\n  \n\n  query GetUserChats($userId: ID!) {\n    findUserChats(userId: $userId) {\n      ...ChatFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n\n  subscription ChatList($userId: ID!) {\n    chatList(userId: $userId) {\n      ...ChatFields\n    }\n  }\n"): (typeof documents)["\n  \n\n  subscription ChatList($userId: ID!) {\n    chatList(userId: $userId) {\n      ...ChatFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindUser($payload: String!) {\n    findUser(payload: $payload) {\n      firebaseId\n      displayName\n      photoURL\n    }\n  }\n"): (typeof documents)["\n  query FindUser($payload: String!) {\n    findUser(payload: $payload) {\n      firebaseId\n      displayName\n      photoURL\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MessageFields on Message {\n    __typename\n    id\n    author {\n      displayName\n      firebaseId\n      online\n      photoURL\n    }\n    read\n    timeStamp\n\n    ... on TextMessage {\n      text\n    }\n\n    ... on VoiceMessage {\n      voiceUrl\n    }\n\n    ... on PictureMessage {\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  fragment MessageFields on Message {\n    __typename\n    id\n    author {\n      displayName\n      firebaseId\n      online\n      photoURL\n    }\n    read\n    timeStamp\n\n    ... on TextMessage {\n      text\n    }\n\n    ... on VoiceMessage {\n      voiceUrl\n    }\n\n    ... on PictureMessage {\n      imageUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n\n  fragment ChatFields on Chat {\n    id\n    members {\n      firebaseId\n      displayName\n      online\n    }\n    messages {\n      ...MessageFields\n    }\n  }\n"): (typeof documents)["\n  \n\n  fragment ChatFields on Chat {\n    id\n    members {\n      firebaseId\n      displayName\n      online\n    }\n    messages {\n      ...MessageFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n\n  mutation CreateChat($members: [ID!]!) {\n    createChat(members: $members) {\n      ...ChatFields\n    }\n  }\n"): (typeof documents)["\n  \n\n  mutation CreateChat($members: [ID!]!) {\n    createChat(members: $members) {\n      ...ChatFields\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;