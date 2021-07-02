import { Connection } from 'mongoose'
import { PROGRAM_MODEL } from '../constant/constant'
import { ProgramSchema } from './schemas/program.schema'

export const programProviders = [
  {
    provide: PROGRAM_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Program', ProgramSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
