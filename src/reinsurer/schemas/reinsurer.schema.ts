import * as mongoose from 'mongoose'
import {Schema} from 'mongoose'

export const ReinsurerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'HeadQuarter',
        required: true
    },
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
    // program: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Program'
    //     }
    // ],
})
