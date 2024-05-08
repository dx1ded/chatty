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
  Date: { input: any; output: any; }
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID']['output'];
  members: Array<User>;
  messages: Array<Message>;
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
  timeStamp: Scalars['Date']['output'];
};

export type MessageInput = {
  chat: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeOnlineStatus?: Maybe<User>;
  createChat?: Maybe<Chat>;
  createPictureMessage?: Maybe<PictureMessage>;
  createTextMessage?: Maybe<TextMessage>;
  createUser: User;
  createVoiceMessage?: Maybe<VoiceMessage>;
  readMessages?: Maybe<Array<Message>>;
};


export type MutationChangeOnlineStatusArgs = {
  status: Scalars['Boolean']['input'];
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


export type MutationReadMessagesArgs = {
  messageIds: Array<Scalars['ID']['input']>;
};

export type PictureMessage = Message & {
  __typename?: 'PictureMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  timeStamp: Scalars['Date']['output'];
};

export type PictureMessageInput = {
  imageUrl: Scalars['String']['input'];
  meta: MessageInput;
};

/**
 * I guess it's not a good solution however it significantly reduces the data
 * Chat list needs only the first message. At the same time it displays how many new messages are there
 * There's no point of retrieving all messages, it's much better to use the `newMessagesCount` field
 */
export type PreviewChat = {
  __typename?: 'PreviewChat';
  id: Scalars['ID']['output'];
  members: Array<User>;
  messages: Array<Message>;
  newMessagesCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<Chat>;
  findUser?: Maybe<Array<User>>;
  findUserChats: Array<PreviewChat>;
  isEmailUsed: Scalars['Boolean']['output'];
  messages?: Maybe<Array<Message>>;
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


export type QueryMessagesArgs = {
  chatId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageRead: Array<Message>;
  newChat: PreviewChat;
  newMessage: Message;
  onlineStatus: User;
};


export type SubscriptionMessageReadArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionNewChatArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionNewMessageArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionOnlineStatusArgs = {
  userId: Scalars['ID']['input'];
};

export type TextMessage = Message & {
  __typename?: 'TextMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
  timeStamp: Scalars['Date']['output'];
};

export type TextMessageInput = {
  meta: MessageInput;
  text: Scalars['String']['input'];
};

export type UMessage = PictureMessage | TextMessage | VoiceMessage;

export type User = {
  __typename?: 'User';
  chats: Array<Chat>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firebaseId: Scalars['ID']['output'];
  messages: Array<Message>;
  online: Scalars['Boolean']['output'];
  photoURL: Scalars['String']['output'];
};

export type VoiceMessage = Message & {
  __typename?: 'VoiceMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  timeStamp: Scalars['Date']['output'];
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

export type GetChatQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type GetChatQuery = { __typename?: 'Query', chat?: (
    { __typename?: 'Chat' }
    & { ' $fragmentRefs'?: { 'ChatFieldsFragment': ChatFieldsFragment } }
  ) | null };

export type GetChatListQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetChatListQuery = { __typename?: 'Query', findUserChats: Array<(
    { __typename?: 'PreviewChat' }
    & { ' $fragmentRefs'?: { 'PreviewChatFieldsFragment': PreviewChatFieldsFragment } }
  )> };

export type ChatListSubscriptionVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type ChatListSubscription = { __typename?: 'Subscription', newChat: (
    { __typename?: 'PreviewChat' }
    & { ' $fragmentRefs'?: { 'PreviewChatFieldsFragment': PreviewChatFieldsFragment } }
  ) };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages?: Array<(
    { __typename?: 'PictureMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_PictureMessage_Fragment': MessageFields_PictureMessage_Fragment } }
  ) | (
    { __typename?: 'TextMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_TextMessage_Fragment': MessageFields_TextMessage_Fragment } }
  ) | (
    { __typename?: 'VoiceMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_VoiceMessage_Fragment': MessageFields_VoiceMessage_Fragment } }
  )> | null };

export type CreateTextMessageMutationVariables = Exact<{
  message: TextMessageInput;
}>;


export type CreateTextMessageMutation = { __typename?: 'Mutation', createTextMessage?: (
    { __typename?: 'TextMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_TextMessage_Fragment': MessageFields_TextMessage_Fragment } }
  ) | null };

export type NewMessageSubscriptionVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: (
    { __typename?: 'PictureMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_PictureMessage_Fragment': MessageFields_PictureMessage_Fragment } }
  ) | (
    { __typename?: 'TextMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_TextMessage_Fragment': MessageFields_TextMessage_Fragment } }
  ) | (
    { __typename?: 'VoiceMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_VoiceMessage_Fragment': MessageFields_VoiceMessage_Fragment } }
  ) };

export type MessageReadSubscriptionVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type MessageReadSubscription = { __typename?: 'Subscription', messageRead: Array<{ __typename?: 'PictureMessage', id: string } | { __typename?: 'TextMessage', id: string } | { __typename?: 'VoiceMessage', id: string }> };

export type ReadMessagesMutationVariables = Exact<{
  messageIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type ReadMessagesMutation = { __typename?: 'Mutation', readMessages?: Array<{ __typename?: 'PictureMessage', id: string } | { __typename?: 'TextMessage', id: string } | { __typename?: 'VoiceMessage', id: string }> | null };

export type FindUserQueryVariables = Exact<{
  payload: Scalars['String']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: Array<{ __typename?: 'User', firebaseId: string, displayName: string, photoURL: string }> | null };

export type ChangeOnlineStatusMutationVariables = Exact<{
  status: Scalars['Boolean']['input'];
}>;


export type ChangeOnlineStatusMutation = { __typename?: 'Mutation', changeOnlineStatus?: { __typename?: 'User', firebaseId: string } | null };

export type OnlineStatusSubscriptionVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type OnlineStatusSubscription = { __typename?: 'Subscription', onlineStatus: { __typename?: 'User', firebaseId: string, online: boolean } };

type MessageFields_PictureMessage_Fragment = { __typename: 'PictureMessage', imageUrl: string, id: string, read: boolean, timeStamp: any, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string }, chat: { __typename?: 'Chat', id: string } } & { ' $fragmentName'?: 'MessageFields_PictureMessage_Fragment' };

type MessageFields_TextMessage_Fragment = { __typename: 'TextMessage', text: string, id: string, read: boolean, timeStamp: any, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string }, chat: { __typename?: 'Chat', id: string } } & { ' $fragmentName'?: 'MessageFields_TextMessage_Fragment' };

type MessageFields_VoiceMessage_Fragment = { __typename: 'VoiceMessage', voiceUrl: string, id: string, read: boolean, timeStamp: any, author: { __typename?: 'User', displayName: string, firebaseId: string, online: boolean, photoURL: string }, chat: { __typename?: 'Chat', id: string } } & { ' $fragmentName'?: 'MessageFields_VoiceMessage_Fragment' };

export type MessageFieldsFragment = MessageFields_PictureMessage_Fragment | MessageFields_TextMessage_Fragment | MessageFields_VoiceMessage_Fragment;

export type ChatFieldsFragment = { __typename: 'Chat', id: string, members: Array<{ __typename?: 'User', firebaseId: string, displayName: string, online: boolean, photoURL: string }>, messages: Array<(
    { __typename?: 'PictureMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_PictureMessage_Fragment': MessageFields_PictureMessage_Fragment } }
  ) | (
    { __typename?: 'TextMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_TextMessage_Fragment': MessageFields_TextMessage_Fragment } }
  ) | (
    { __typename?: 'VoiceMessage' }
    & { ' $fragmentRefs'?: { 'MessageFields_VoiceMessage_Fragment': MessageFields_VoiceMessage_Fragment } }
  )> } & { ' $fragmentName'?: 'ChatFieldsFragment' };

export type PreviewChatFieldsFragment = { __typename?: 'PreviewChat', id: string, newMessagesCount: number, members: Array<{ __typename?: 'User', firebaseId: string, photoURL: string, online: boolean, displayName: string }>, messages: Array<{ __typename: 'PictureMessage', id: string, timeStamp: any, read: boolean, author: { __typename?: 'User', firebaseId: string, online: boolean, photoURL: string, displayName: string } } | { __typename: 'TextMessage', text: string, id: string, timeStamp: any, read: boolean, author: { __typename?: 'User', firebaseId: string, online: boolean, photoURL: string, displayName: string } } | { __typename: 'VoiceMessage', id: string, timeStamp: any, read: boolean, author: { __typename?: 'User', firebaseId: string, online: boolean, photoURL: string, displayName: string } }> } & { ' $fragmentName'?: 'PreviewChatFieldsFragment' };

export type CreateChatMutationVariables = Exact<{
  members: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat?: (
    { __typename?: 'Chat' }
    & { ' $fragmentRefs'?: { 'ChatFieldsFragment': ChatFieldsFragment } }
  ) | null };

export const MessageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<MessageFieldsFragment, unknown>;
export const ChatFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<ChatFieldsFragment, unknown>;
export const PreviewChatFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PreviewChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PreviewChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<PreviewChatFieldsFragment, unknown>;
export const IsEmailUsedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsEmailUsed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isEmailUsed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<IsEmailUsedQuery, IsEmailUsedQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const GetChatListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChatList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUserChats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PreviewChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PreviewChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PreviewChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatListQuery, GetChatListQueryVariables>;
export const ChatListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChatList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PreviewChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PreviewChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PreviewChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newMessagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<ChatListSubscription, ChatListSubscriptionVariables>;
export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const CreateTextMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTextMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTextMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<CreateTextMessageMutation, CreateTextMessageMutationVariables>;
export const NewMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<NewMessageSubscription, NewMessageSubscriptionVariables>;
export const MessageReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MessageReadSubscription, MessageReadSubscriptionVariables>;
export const ReadMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReadMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ReadMessagesMutation, ReadMessagesMutationVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;
export const ChangeOnlineStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeOnlineStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeOnlineStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}}]}}]}}]} as unknown as DocumentNode<ChangeOnlineStatusMutation, ChangeOnlineStatusMutationVariables>;
export const OnlineStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnlineStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onlineStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}}]}}]}}]} as unknown as DocumentNode<OnlineStatusSubscription, OnlineStatusSubscriptionVariables>;
export const CreateChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"members"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"members"},"value":{"kind":"Variable","name":{"kind":"Name","value":"members"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"timeStamp"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VoiceMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voiceUrl"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firebaseId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"online"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageFields"}}]}}]}}]} as unknown as DocumentNode<CreateChatMutation, CreateChatMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID']['output'];
  members: Array<User>;
  messages: Array<Message>;
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
  timeStamp: Scalars['Date']['output'];
};

export type MessageInput = {
  chat: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeOnlineStatus?: Maybe<User>;
  createChat?: Maybe<Chat>;
  createPictureMessage?: Maybe<PictureMessage>;
  createTextMessage?: Maybe<TextMessage>;
  createUser: User;
  createVoiceMessage?: Maybe<VoiceMessage>;
  readMessages?: Maybe<Array<Message>>;
};


export type MutationChangeOnlineStatusArgs = {
  status: Scalars['Boolean']['input'];
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


export type MutationReadMessagesArgs = {
  messageIds: Array<Scalars['ID']['input']>;
};

export type PictureMessage = Message & {
  __typename?: 'PictureMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  timeStamp: Scalars['Date']['output'];
};

export type PictureMessageInput = {
  imageUrl: Scalars['String']['input'];
  meta: MessageInput;
};

/**
 * I guess it's not a good solution however it significantly reduces the data
 * Chat list needs only the first message. At the same time it displays how many new messages are there
 * There's no point of retrieving all messages, it's much better to use the `newMessagesCount` field
 */
export type PreviewChat = {
  __typename?: 'PreviewChat';
  id: Scalars['ID']['output'];
  members: Array<User>;
  messages: Array<Message>;
  newMessagesCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<Chat>;
  findUser?: Maybe<Array<User>>;
  findUserChats: Array<PreviewChat>;
  isEmailUsed: Scalars['Boolean']['output'];
  messages?: Maybe<Array<Message>>;
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


export type QueryMessagesArgs = {
  chatId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageRead: Array<Message>;
  newChat: PreviewChat;
  newMessage: Message;
  onlineStatus: User;
};


export type SubscriptionMessageReadArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionNewChatArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionNewMessageArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionOnlineStatusArgs = {
  userId: Scalars['ID']['input'];
};

export type TextMessage = Message & {
  __typename?: 'TextMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
  timeStamp: Scalars['Date']['output'];
};

export type TextMessageInput = {
  meta: MessageInput;
  text: Scalars['String']['input'];
};

export type UMessage = PictureMessage | TextMessage | VoiceMessage;

export type User = {
  __typename?: 'User';
  chats: Array<Chat>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firebaseId: Scalars['ID']['output'];
  messages: Array<Message>;
  online: Scalars['Boolean']['output'];
  photoURL: Scalars['String']['output'];
};

export type VoiceMessage = Message & {
  __typename?: 'VoiceMessage';
  author: User;
  chat: Chat;
  id: Scalars['ID']['output'];
  read: Scalars['Boolean']['output'];
  timeStamp: Scalars['Date']['output'];
  voiceUrl: Scalars['String']['output'];
};

export type VoiceMessageInput = {
  meta: MessageInput;
  voiceUrl: Scalars['String']['input'];
};
