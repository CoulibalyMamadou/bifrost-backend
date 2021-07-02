import { Connection } from 'mongoose'
import { UsersSchema } from './schemas/users.schema'
import { USER_MODEL } from '../constant/constant'

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
