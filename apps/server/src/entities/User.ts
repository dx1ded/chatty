import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, Relation } from "typeorm"
import type { User as IUser } from "../graphql/__generated__"
import { Message } from "./Message"
import { Chat } from "./Chat"

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firebaseId: string

  @Column()
  displayName: string

  @Column()
  email: string

  @Column()
  photoURL: string

  @Column()
  online: boolean

  @OneToMany(() => Message, (message) => message.author)
  messages: Relation<Message>[]

  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Relation<Chat>[]

  constructor(firebaseId: string, displayName: string, email: string, photoURL: string, online = false) {
    this.firebaseId = firebaseId
    this.displayName = displayName
    this.email = email
    this.photoURL = photoURL
    this.online = online
  }
}
