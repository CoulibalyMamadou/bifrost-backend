import { Document } from 'mongoose'

export interface ReinsurerInterface extends Document {
  readonly id: string
  readonly username: string
  readonly email: string
  readonly password: string
  readonly office: string
  readonly firstName: string
  readonly lastName: string
  // readonly program: Array<string>
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
