import { ChildEntity, Column } from "typeorm"
import { Message } from "./Message"
import { type PictureMessage as IPictureMessage } from "../graphql/__generated__"
import { User } from "./User"
import { Chat } from "./Chat"

@ChildEntity()
export class PictureMessage extends Message implements IPictureMessage {
  @Column()
  imageUrl: string

  constructor(imageUrl: string, author: User, chat: Chat) {
    super(author, chat)
    this.imageUrl = imageUrl
  }
}
