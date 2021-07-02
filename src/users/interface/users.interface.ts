import { Document } from 'mongoose'

export interface UserInterface extends Document {
  readonly id: String
  readonly username: string
  readonly email: string
  readonly password: string
  readonly organization: string
  readonly firstName: string
}
