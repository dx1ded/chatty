import { PubSub } from "graphql-subscriptions"

export default new PubSub()

export const CHAT_CREATED = "CHAT_CREATED"
export const NEW_MESSAGE = "NEW_MESSAGE"
