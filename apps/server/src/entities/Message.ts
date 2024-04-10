import { nanoid } from "nanoid"
import { Entity, Column, PrimaryColumn, ManyToOne, TableInheritance } from "typeorm"
import { Message as IMessage } from "../modules/__generated__"
import { User } from "./User"
import { Chat } from "./Chat"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Message implements IMessage {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => User, (user) => user.messages)
  author: User

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat

  @Column()
  timeStamp: string

  @Column()
  read: boolean

  constructor(author: User, chat: Chat) {
    this.id = nanoid(8)
    this.author = author
    this.chat = chat
    this.read = false
    this.timeStamp = `${Date.now()}`
  }
}
