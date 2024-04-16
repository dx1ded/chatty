import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  createChat?: Maybe<Chat>;
  createPictureMessage?: Maybe<PictureMessage>;
  createTextMessage?: Maybe<TextMessage>;
  createUser: User;
  createVoiceMessage?: Maybe<VoiceMessage>;
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
  newChat: PreviewChat;
  newMessage: UMessage;
};


export type SubscriptionNewChatArgs = {
  userId: Scalars['ID']['input'];
};


export type SubscriptionNewMessageArgs = {
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
  timeStamp: Scalars['Date']['output'];
  voiceUrl: Scalars['String']['output'];
};

export type VoiceMessageInput = {
  meta: MessageInput;
  voiceUrl: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  UMessage: ( PictureMessage ) | ( TextMessage ) | ( VoiceMessage );
}>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Message: ( PictureMessage ) | ( TextMessage ) | ( VoiceMessage );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Chat: ResolverTypeWrapper<Chat>;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Message: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Message']>;
  MessageInput: MessageInput;
  Mutation: ResolverTypeWrapper<{}>;
  PictureMessage: ResolverTypeWrapper<PictureMessage>;
  PictureMessageInput: PictureMessageInput;
  PreviewChat: ResolverTypeWrapper<PreviewChat>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  TextMessage: ResolverTypeWrapper<TextMessage>;
  TextMessageInput: TextMessageInput;
  UMessage: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UMessage']>;
  User: ResolverTypeWrapper<User>;
  VoiceMessage: ResolverTypeWrapper<VoiceMessage>;
  VoiceMessageInput: VoiceMessageInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Chat: Chat;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Message: ResolversInterfaceTypes<ResolversParentTypes>['Message'];
  MessageInput: MessageInput;
  Mutation: {};
  PictureMessage: PictureMessage;
  PictureMessageInput: PictureMessageInput;
  PreviewChat: PreviewChat;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  TextMessage: TextMessage;
  TextMessageInput: TextMessageInput;
  UMessage: ResolversUnionTypes<ResolversParentTypes>['UMessage'];
  User: User;
  VoiceMessage: VoiceMessage;
  VoiceMessageInput: VoiceMessageInput;
}>;

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PictureMessage' | 'TextMessage' | 'VoiceMessage', ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timeStamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<MutationCreateChatArgs, 'members'>>;
  createPictureMessage?: Resolver<Maybe<ResolversTypes['PictureMessage']>, ParentType, ContextType, RequireFields<MutationCreatePictureMessageArgs, 'message'>>;
  createTextMessage?: Resolver<Maybe<ResolversTypes['TextMessage']>, ParentType, ContextType, RequireFields<MutationCreateTextMessageArgs, 'message'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  createVoiceMessage?: Resolver<Maybe<ResolversTypes['VoiceMessage']>, ParentType, ContextType, RequireFields<MutationCreateVoiceMessageArgs, 'message'>>;
}>;

export type PictureMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['PictureMessage'] = ResolversParentTypes['PictureMessage']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timeStamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PreviewChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreviewChat'] = ResolversParentTypes['PreviewChat']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  newMessagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryChatArgs, 'id'>>;
  findUser?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryFindUserArgs, 'payload'>>;
  findUserChats?: Resolver<Array<ResolversTypes['PreviewChat']>, ParentType, ContextType, RequireFields<QueryFindUserChatsArgs, 'userId'>>;
  isEmailUsed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryIsEmailUsedArgs, 'email'>>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  newChat?: SubscriptionResolver<ResolversTypes['PreviewChat'], "newChat", ParentType, ContextType, RequireFields<SubscriptionNewChatArgs, 'userId'>>;
  newMessage?: SubscriptionResolver<ResolversTypes['UMessage'], "newMessage", ParentType, ContextType, RequireFields<SubscriptionNewMessageArgs, 'userId'>>;
}>;

export type TextMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextMessage'] = ResolversParentTypes['TextMessage']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeStamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['UMessage'] = ResolversParentTypes['UMessage']> = ResolversObject<{
  __resolveType: TypeResolveFn<'PictureMessage' | 'TextMessage' | 'VoiceMessage', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firebaseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  photoURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoiceMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoiceMessage'] = ResolversParentTypes['VoiceMessage']> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  timeStamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  voiceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Chat?: ChatResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PictureMessage?: PictureMessageResolvers<ContextType>;
  PreviewChat?: PreviewChatResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TextMessage?: TextMessageResolvers<ContextType>;
  UMessage?: UMessageResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VoiceMessage?: VoiceMessageResolvers<ContextType>;
}>;

