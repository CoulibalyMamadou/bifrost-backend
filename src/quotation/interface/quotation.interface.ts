import { Document } from 'mongoose'

export interface QuotationInterface extends Document {
  readonly id: string
  readonly office: string
  // readonly insurer: string
  readonly program: string
  readonly quotations: [{
    layer: string,
    quote: Array<{
      quantity: number,
      price: number
    }>
  }]
}
