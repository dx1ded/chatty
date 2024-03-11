/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID']['output'];
  members: Array<Scalars['ID']['output']>;
  messages: Array<Maybe<Message>>;
};

export type CreateUserInput = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  photoURL: Scalars['String']['input'];
  uid: Scalars['ID']['input'];
};

export type Message = {
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  timeStamp: Scalars['Int']['output'];
};

export type MessageInput = {
  chat: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat?: Maybe<Chat>;
  createPictureMessage: PictureMessage;
  createTextMessage: TextMessage;
  createUser: User;
  createVoiceMessage: VoiceMessage;
};


export type MutationCreateChatArgs = {
  members: Array<Scalars['ID']['input']>;
};


export type MutationCreatePictureMessageArgs = {
  message: PictureMessageInput;
};


export type MutationCreateTextMessageArgs = {
  message: TextMessageInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationCreateVoiceMessageArgs = {
  message: VoiceMessageInput;
};

export type PictureMessage = Message & {
  __typename?: 'PictureMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  timeStamp: Scalars['Int']['output'];
};

export type PictureMessageInput = {
  imageUrl: Scalars['String']['input'];
  meta: MessageInput;
};

export type Query = {
  __typename?: 'Query';
  chat: Array<Maybe<Chat>>;
  findUserChats: Array<Maybe<Chat>>;
  isEmailUsed: Scalars['Boolean']['output'];
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindUserChatsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryIsEmailUsedArgs = {
  email: Scalars['String']['input'];
};

export type TextMessage = Message & {
  __typename?: 'TextMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
  timeStamp: Scalars['Int']['output'];
};

export type TextMessageInput = {
  meta: MessageInput;
  text: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firebaseId: Scalars['ID']['output'];
  online: Scalars['Boolean']['output'];
  photoURL: Scalars['String']['output'];
};

export type VoiceMessage = Message & {
  __typename?: 'VoiceMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  timeStamp: Scalars['Int']['output'];
  voiceUrl: Scalars['String']['output'];
};

export type VoiceMessageInput = {
  meta: MessageInput;
  voiceUrl: Scalars['String']['input'];
};

export type IsEmailUsedQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type IsEmailUsedQuery = { __typename?: 'Query', isEmailUsed: boolean };

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', firebaseId: string } };


export const IsEmailUsedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsEmailUsed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailUsed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<IsEmailUsedQuery, IsEmailUsedQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;