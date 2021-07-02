import { Schema } from 'mongoose'

export class CreateLayerDto {
  attachmentPoint: number
  layerLimit: number
  portion: number
  program: string
  share?: number
  targetPrice?: number
  reinstatement?: string
}

export class LayerSearchDto {
  _id: string
}

export class LayerUpdateDto {
  _id?: string
  attachmentPoint?: number
  layerLimit?: number
  portion?: number
  share?: number
  targetPrice?: number
  reinstatement?: {  }
}
