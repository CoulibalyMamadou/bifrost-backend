import { Connection } from 'mongoose'
import { OFFICE_MODEL } from '../constant/constant'
import { OfficeSchema } from './schemas/office.schema'

export const officeProviders = [
  {
    provide: OFFICE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Office', OfficeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
