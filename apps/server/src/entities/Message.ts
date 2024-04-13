import { nanoid } from "nanoid"
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  TableInheritance,
  Relation,
  CreateDateColumn,
} from "typeorm"
import { Message as IMessage } from "../graphql/__generated__"
import { User } from "./User"
import { Chat } from "./Chat"

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Message implements IMessage {
  @PrimaryColumn({ default: nanoid(8) })
  id: string

  @ManyToOne(() => User, (user) => user.messages)
  author: Relation<User>

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Relation<Chat>

  @CreateDateColumn()
  timeStamp: Date

  @Column({ default: false })
  read: boolean

  constructor(author: Relation<User>, chat: Relation<Chat>) {
    this.id = nanoid(8)
    this.author = author
    this.chat = chat
  }
}
