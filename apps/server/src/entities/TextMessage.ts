import { Column, Entity } from "typeorm"
import { Message } from "./Message"
import { type TextMessage as ITextMessage } from "../modules/types"
import type { User } from "./User"
import type { Chat } from "./Chat"

@Entity()
export class TextMessage extends Message implements ITextMessage {
  @Column("text")
  text: string

  constructor(text: string, author: User, chat: Chat) {
    super("TEXT", author, chat)
    this.text = text
  }
}
