import { Column, Entity } from "typeorm"
import { Message } from "./Message"
import { User } from "./User"
import { type VoiceMessage as IVoiceMessage } from "../modules/__generated__"
import type { Chat } from "./Chat"

@Entity()
export class VoiceMessage extends Message implements IVoiceMessage {
  @Column("text")
  voiceUrl: string

  constructor(voiceUrl: string, author: User, chat: Chat) {
    super(author, chat)
    this.voiceUrl = voiceUrl
  }
}
