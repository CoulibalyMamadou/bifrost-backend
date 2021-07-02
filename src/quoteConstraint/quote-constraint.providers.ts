import { Connection } from 'mongoose'
import { QUOTE_CONSTRAINT_MODEL } from '../constant/constant'
import { QuoteConstraintSchema } from './schemas/quote-constraint.schema'

export const quoteConstraintProviders = [
  {
    provide: QUOTE_CONSTRAINT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('QuoteConstraint', QuoteConstraintSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
