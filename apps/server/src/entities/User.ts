import { Entity, Column, PrimaryColumn } from "typeorm"
import type { User as IUser } from "../modules/types"

@Entity()
export class User implements IUser {
  @PrimaryColumn("text")
  id: string

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

  constructor(firebaseId: string, displayName: string, email: string, photoURL: string, online = false) {
    this.firebaseId = firebaseId
    this.displayName = displayName
    this.email = email
    this.photoURL = photoURL
    this.online = online
  }
}
