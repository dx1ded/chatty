import { nanoid } from "nanoid"
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import { Message as IMessage } from "../modules/__generated__"
import { User } from "./User"
import { Chat } from "./Chat"

@Entity()
export class Message implements IMessage {
  @PrimaryColumn("text")
  id: string

  @ManyToOne(() => User, (user) => user.messages)
  author: User

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat

  @Column("text")
  timeStamp: string

  @Column("boolean")
  read: boolean

  constructor(author: User, chat: Chat) {
    this.id = nanoid(8)
    this.author = author
    this.chat = chat
    this.read = false
    this.timeStamp = `${Date.now()}`
  }
}
