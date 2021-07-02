import { Connection } from 'mongoose'
import { DOCUMENT_MODEL } from '../constant/constant'
import { DocumentSchema } from './schemas/document.schema'

export const documentProviders = [
  {
    provide: DOCUMENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Document', DocumentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
