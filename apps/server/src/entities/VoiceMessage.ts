import { Column, ChildEntity } from "typeorm"
import { Message } from "./Message"
import { User } from "./User"
import { type VoiceMessage as IVoiceMessage } from "../graphql/__generated__"
import type { Chat } from "./Chat"

@ChildEntity()
export class VoiceMessage extends Message implements IVoiceMessage {
  @Column()
  voiceUrl: string

  constructor(voiceUrl: string, author: User, chat: Chat) {
    super(author, chat)
    this.voiceUrl = voiceUrl
  }
}
