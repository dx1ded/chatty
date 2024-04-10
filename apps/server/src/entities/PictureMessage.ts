import { ChildEntity, Column, ManyToOne } from "typeorm"
import { Message } from "./Message"
import { type PictureMessage as IPictureMessage } from "../modules/__generated__"
import { User } from "./User"
import { Chat } from "./Chat"

@ChildEntity()
export class PictureMessage extends Message implements IPictureMessage {
  @Column()
  imageUrl: string

  @ManyToOne(() => User, (user) => user.messages)
  author: User

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat

  constructor(imageUrl: string, author: User, chat: Chat) {
    super(author, chat)
    this.imageUrl = imageUrl
  }
}
