import { Document } from 'mongoose'

export interface ConstraintInterface extends Document {
  readonly id: string
  readonly type: string,
  readonly groupOffice: {
    name: string,
    offices: Array<string>
  },
  readonly constraint: {
    type: string,
    value: number,
    target: string
  }
}
