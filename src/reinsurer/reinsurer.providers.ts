import { Connection } from 'mongoose'
import {REINSURER_MODEL, REINSURER_MODEL_NAME} from '../constant/constant'
import { ReinsurerSchema } from './schemas/reinsurer.schema'

export const reinsurerProviders = [
  {
    provide: REINSURER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(REINSURER_MODEL_NAME, ReinsurerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
