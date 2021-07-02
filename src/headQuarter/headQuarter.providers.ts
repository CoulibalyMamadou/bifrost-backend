import { Connection } from 'mongoose'
import { HeadQuarterSchema } from './schemas/headQuarter.schema'
import { HEAD_QUARTER_MODEL } from '../constant/constant'

export const headQuarterProviders = [
  {
    provide: HEAD_QUARTER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('HeadQuarter', HeadQuarterSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
