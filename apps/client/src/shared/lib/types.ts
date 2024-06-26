import type { MessageFieldsFragment, User } from "__generated__/graphql"
import type { PropsWithChildren } from "react"

export type PropsWithClassName<T = unknown> = PropsWithChildren<T>
export type MessageID = MessageFieldsFragment["id"]
export type UserID = User["firebaseId"]
