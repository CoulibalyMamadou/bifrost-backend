import { Connection } from 'mongoose'
import {CONSTRAINT_MODEL} from '../constant/constant'
import { ConstraintSchema } from './schemas/constraint.schema'

export const constraintProviders = [
  {
    provide: CONSTRAINT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Constraint', ConstraintSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
