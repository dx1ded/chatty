import { nanoid } from "nanoid"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  Relation,
} from "typeorm"
import type { Chat as IChat } from "../graphql/__generated__"
import { User } from "./User"
import { Message } from "./Message"

@Entity()
export class Chat implements IChat {
  @PrimaryColumn({ default: nanoid(8) })
  id: string

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  members: Relation<User>[]

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Relation<Message>[]

  @Column({ nullable: true, select: false })
  newMessagesCount: number

  @CreateDateColumn()
  createdAt: Date
}
