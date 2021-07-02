import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { AddressDto } from '../../constant/ObjectSchema'

export const OfficeSchema = new mongoose.Schema({
  name: String,
  address: AddressDto, // TODO :  refactor and change
  headQuarter: {
    type: Schema.Types.ObjectId,
    ref: 'HeadQuarter',
  },
  insurers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Insurer',
    },
  ],
  program: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Program',
    },
  ],
  programQuoteConstraints: [
    {
      program: {
        type: Schema.Types.ObjectId,
        ref: 'Program'
      },
      quoteConstraint: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteConstraint'
      },
      previousQuoteConstraint: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteConstraint'
      }
    }
  ],
  programQuotations: [
    {
      program: {
        type: Schema.Types.ObjectId,
        ref: 'Program'
      },
      quotation: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteConstraint'
      },
      previousQuotation: {
        type: Schema.Types.ObjectId,
        ref: 'QuoteConstraint'
      }
    }
  ]
})
