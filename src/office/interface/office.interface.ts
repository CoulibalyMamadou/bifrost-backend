import { Document } from 'mongoose'
import { AddressDto } from '../../constant/ObjectSchema'

export interface OfficeInterface extends Document {
  id: string
  name: string
  address: typeof AddressDto // TODO :  refactor and change
  headQuarter: string
  insurers: Array<string>
  program: Array<string>
  readonly programQuoteConstraints: Array<{
    program: string,
    quoteConstraint: string,
    previousQuoteConstraint: string
  }>
  readonly programQuotations: Array<{
    program: string,
    quotation: string,
    previousQuotation?: string
  }>
}
