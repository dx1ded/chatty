import { nanoid } from "nanoid"
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import type { Message as IMessage } from "../modules/types"
import { User } from "./User"
import { Chat } from "./Chat"

@Entity()
export abstract class Message implements IMessage {
  @PrimaryColumn("text")
  id: string

  @Column("text")
  type: string

  @ManyToOne(() => User, (user) => user.messages)
  author: User

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat

  @Column("int")
  timeStamp: number

  @Column("boolean")
  read: boolean

  constructor(type: string, author: User, chat: Chat) {
    this.id = nanoid(8)
    this.type = type
    this.author = author
    this.chat = chat
    this.timeStamp = Date.now()
    this.read = false
  }
}
