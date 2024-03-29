import { nanoid } from "nanoid"
import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"
import type { Chat as IChat } from "../modules/types"
import { User } from "./User"
import { Message } from "./Message"

@Entity()
export class Chat implements IChat {
  @PrimaryColumn("text")
  id: string

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  members: User[]

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[]

  constructor() {
    this.id = nanoid(8)
  }
}
