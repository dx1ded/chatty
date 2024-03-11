import { Column, Entity } from "typeorm"
import { Message } from "./Message"
import { type PictureMessage as IPictureMessage } from "../modules/types"
import type { User } from "./User"
import type { Chat } from "./Chat"

@Entity()
export class PictureMessage extends Message implements IPictureMessage {
  @Column("text")
  imageUrl: string

  constructor(imageUrl: string, author: User, chat: Chat) {
    super("VOICE", author, chat)
    this.imageUrl = imageUrl
  }
}
