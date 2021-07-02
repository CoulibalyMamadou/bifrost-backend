import { Connection } from 'mongoose'
import { INSURER_MODEL } from '../constant/constant'
import { InsurerSchema } from './schemas/insurer.schema'

export const insurerProviders = [
  {
    provide: INSURER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Insurer', InsurerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
