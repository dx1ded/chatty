import { PubSub } from "graphql-subscriptions"

export default new PubSub()

export enum EVENT {
  CHAT_CREATED = "CHAT_CREATED",
  NEW_MESSAGE = "NEW_MESSAGE",
  STATUS_CHANGE = "STATUS_CHANGE",
}
