import { Connection } from 'mongoose'
import {AUTH_MODEL, AUTH_MODEL_NAME} from '../constant/constant'
import { AuthSchema } from './schemas/auth.schema'

export const authProviders = [
  {
    provide: AUTH_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(AUTH_MODEL_NAME, AuthSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
