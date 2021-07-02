import { Document } from 'mongoose'

export interface QuoteConstraintInterface extends Document {
  readonly id: string
  // readonly insurer: string
  readonly office: string
  readonly program: string
  readonly constraints: Array<{
    type: string,
    value: number,
    target: string
  }>
}
