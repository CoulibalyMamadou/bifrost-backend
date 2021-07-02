import { Connection } from 'mongoose'
import { LAYER_MODEL } from '../constant/constant'
import { LayerSchema } from './schemas/layer.schema'

export const layerProviders = [
  {
    provide: LAYER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Layer', LayerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
