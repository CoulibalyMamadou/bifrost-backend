import { Document } from 'mongoose'
import { AddressDto } from '../../constant/ObjectSchema'

export interface HeadQuarterInterface extends Document {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly address: typeof AddressDto
  readonly creditRating: string
  readonly office: Array<string>
}
