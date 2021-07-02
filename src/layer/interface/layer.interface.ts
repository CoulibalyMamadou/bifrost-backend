import { Document } from 'mongoose'

export interface LayerInterface extends Document {
  readonly id: string
  //readonly name: string,
  readonly layerLimit: number
  readonly attachmentPoint: number
  readonly portion: number
  readonly program: string
  readonly share: number
  readonly targetPrice: number
  readonly reinstatement: {}
}
