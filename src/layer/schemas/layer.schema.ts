import * as mongoose from 'mongoose'

export const LayerSchema = new mongoose.Schema({
  // name: String,
  layerLimit: Number,
  attachmentPoint: Number,
  portion: Number,
  program: String,
  share: Number,
  targetPrice: Number,
  reinstatement: {}
})
