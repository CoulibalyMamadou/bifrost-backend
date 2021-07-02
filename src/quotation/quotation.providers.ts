import { Connection } from 'mongoose'
import { QUOTATION_MODEL } from '../constant/constant'
import { QuotationSchema } from './schemas/quotation.schema'

export const quotationProviders = [
  {
    provide: QUOTATION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Quotation', QuotationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
