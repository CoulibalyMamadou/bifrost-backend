import { Document } from 'mongoose'

export interface ProgramInterface extends Document {
  readonly id: string
  readonly title: string
  readonly type: string
  readonly lineOfBusiness: string
  readonly riskStructure: string
  readonly structure: string
  readonly base: string
  readonly status: string
  readonly dateCreation: Date
  readonly limit: number // si excess of loss
  readonly premiumIncome: number, // si excess of loss
  readonly communicationPeriod: {
    communicationStart: Date
    communicationEnd: Date
  }
  readonly quotationPeriod: {
    quotationStart: Date
    quotationEnd: Date
  }
  readonly layers: Array<string>
  readonly constraints: Array<string>
  readonly quotation: Array<{
    // insurer: string,
    office: string,
    quotation: string,
    previousQuotation?: string
  }>
  readonly quoteConstraint: Array<{
    // insurer: string,
    office: string,
    quoteConstraint: string,
    previousQuoteConstraint?: string
  }>
  // readonly insurer: string
  readonly office: string
  readonly document: Array<string>
}
