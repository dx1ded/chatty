import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm"
import type { User as IUser } from "../modules/types"
import { Message } from "./Message"
import { Chat } from "./Chat"

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text")
  firebaseId: string

  @Column("text")
  displayName: string

  @Column("text")
  email: string

  @Column("text")
  photoURL: string

  @Column("boolean")
  online: boolean

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[]

  @ManyToMany(() => Chat)
  chats: Chat[]

  constructor(firebaseId: string, displayName: string, email: string, photoURL: string, online = false) {
    this.firebaseId = firebaseId
    this.displayName = displayName
    this.email = email
    this.photoURL = photoURL
    this.online = online
  }
}
