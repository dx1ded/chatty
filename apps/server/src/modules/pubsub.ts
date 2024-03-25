import { PubSub } from "graphql-subscriptions"

export default new PubSub()

export const CHAT_CREATED = "CHAT_CREATED"
export const MESSAGE_SENT = "MESSAGE_SENT"
