import { ChildEntity, Column } from "typeorm"
import { Message } from "./Message"
import { type TextMessage as ITextMessage } from "../modules/__generated__"
import type { User } from "./User"
import type { Chat } from "./Chat"

@ChildEntity()
export class TextMessage extends Message implements ITextMessage {
  @Column()
  text: string

  constructor(text: string, author: User, chat: Chat) {
    super(author, chat)
    this.text = text
  }
}
