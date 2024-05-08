import { PubSub } from "graphql-subscriptions"

export default new PubSub()

export enum EVENT {
  CHAT_CREATED = "CHAT_CREATED",
  NEW_MESSAGE = "NEW_MESSAGE",
  ONLINE_STATUS_CHANGE = "ONLINE_STATUS_CHANGE",
  MESSAGE_READ = "MESSAGE_READ",
}
