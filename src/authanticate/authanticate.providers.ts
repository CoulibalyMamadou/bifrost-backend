import { Connection } from 'mongoose'
import {AUTHANTICATE_MODEL, AUTHANTICATE_MODEL_NAME} from '../constant/constant'
import { AuthanticateSchema } from './schemas/authanticate.schema'

export const authanticateProviders = [
  {
    provide: AUTHANTICATE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(AUTHANTICATE_MODEL_NAME, AuthanticateSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
