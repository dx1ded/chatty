import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import type { Chat as IChat } from "../modules/types"
import type { VoiceMessage } from "./VoiceMessage"
import type { TextMessage } from "./TextMessage"
import type { PictureMessage } from "./PictureMessage"
import { Message } from "./Message"

@Entity()
export class Chat implements IChat {
  @PrimaryColumn("text")
  id: string

  @Column("text", { array: true })
  members: string[]

  @OneToMany(() => Message, (message) => message.chat)
  messages: (TextMessage | VoiceMessage | PictureMessage)[]

  constructor(members: string[]) {
    this.members = members
    this.messages = []
  }
}
