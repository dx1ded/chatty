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
  members: Array<User>;
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
  chat?: Maybe<Chat>;
  findUser: Array<User>;
  findUserChats: Array<Chat>;
  isEmailUsed: Scalars['Boolean']['output'];
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindUserArgs = {
  payload: Scalars['String']['input'];
};


export type QueryFindUserChatsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryIsEmailUsedArgs = {
  email: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chat: Chat;
  chatList: Chat;
};


export type SubscriptionChatArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionChatListArgs = {
  userId: Scalars['ID']['input'];
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

export type ChatQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type ChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> } | null };

export type GetUserChatsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserChatsQuery = { __typename?: 'Query', findUserChats: Array<{ __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> }> };

export type ChatListSubscriptionVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type ChatListSubscription = { __typename?: 'Subscription', chatList: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> } };

export type CreateTextMessageMutationVariables = Exact<{
  message: TextMessageInput;
}>;


export type CreateTextMessageMutation = { __typename?: 'Mutation', createTextMessage: { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } };

export type FindUserQueryVariables = Exact<{
  payload: Scalars['String']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: Array<{ __typename?: 'User', firebaseId: string, displayName: string, photoURL: string }> };

type MessageFields_PictureMessage_Fragment = { __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } };

type MessageFields_TextMessage_Fragment = { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } };

type MessageFields_VoiceMessage_Fragment = { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } };

export type MessageFieldsFragment = MessageFields_PictureMessage_Fragment | MessageFields_TextMessage_Fragment | MessageFields_VoiceMessage_Fragment;

export type ChatFieldsFragment = { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> };

export type CreateChatMutationVariables = Exact<{
  members: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat?: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> } | null };

export const MessageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<MessageFieldsFragment, unknown>;
export const ChatFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<ChatFieldsFragment, unknown>;
export const IsEmailUsedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsEmailUsed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailUsed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<IsEmailUsedQuery, IsEmailUsedQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const ChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Chat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}}]} as unknown as DocumentNode<ChatQuery, ChatQueryVariables>;
export const GetUserChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserChats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserChats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}}]} as unknown as DocumentNode<GetUserChatsQuery, GetUserChatsQueryVariables>;
export const ChatListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChatList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}}]} as unknown as DocumentNode<ChatListSubscription, ChatListSubscriptionVariables>;
export const CreateTextMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTextMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTextMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<CreateTextMessageMutation, CreateTextMessageMutationVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;
export const CreateChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"members"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"members"},"value":{"kind":"Variable","name":{"kind":"Name","value":"members"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}}]} as unknown as DocumentNode<CreateChatMutation, CreateChatMutationVariables>;
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
  members: Array<User>;
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
  chat?: Maybe<Chat>;
  findUser: Array<User>;
  findUserChats: Array<Chat>;
  isEmailUsed: Scalars['Boolean']['output'];
};


export type QueryChatArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindUserArgs = {
  payload: Scalars['String']['input'];
};


export type QueryFindUserChatsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryIsEmailUsedArgs = {
  email: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chat: Chat;
  chatList: Chat;
};


export type SubscriptionChatArgs = {
  id: Scalars['ID']['input'];
};


export type SubscriptionChatListArgs = {
  userId: Scalars['ID']['input'];
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

export type ChatQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type ChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> } | null };

export type GetUserChatsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserChatsQuery = { __typename?: 'Query', findUserChats: Array<{ __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> }> };

export type ChatListSubscriptionVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type ChatListSubscription = { __typename?: 'Subscription', chatList: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> } };

export type CreateTextMessageMutationVariables = Exact<{
  message: TextMessageInput;
}>;


export type CreateTextMessageMutation = { __typename?: 'Mutation', createTextMessage: { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } };

export type FindUserQueryVariables = Exact<{
  payload: Scalars['String']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: Array<{ __typename?: 'User', firebaseId: string, displayName: string, photoURL: string }> };

type MessageFields_PictureMessage_Fragment = { __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } };

type MessageFields_TextMessage_Fragment = { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } };

type MessageFields_VoiceMessage_Fragment = { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } };

export type MessageFieldsFragment = MessageFields_PictureMessage_Fragment | MessageFields_TextMessage_Fragment | MessageFields_VoiceMessage_Fragment;

export type ChatFieldsFragment = { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> };

export type CreateChatMutationVariables = Exact<{
  members: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat?: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<{ __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: number, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string } } | null> } | null };
