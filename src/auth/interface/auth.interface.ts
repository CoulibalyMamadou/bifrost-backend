import { Document } from 'mongoose'

export interface AuthInterface extends Document {
  readonly id: string
  readonly userId: string
  readonly email: string
  readonly username: string
  readonly password: string
  readonly userType: string
}

export interface JwtPayload {
  id: string
  email: string
  office: string
  type: string
}