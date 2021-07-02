import * as mongoose from 'mongoose'
import {
  DocumentExtension,
  DocumentExtensionEnum,
  DocumentType,
  DocumentTypeEnum,
} from '../../constant/ObjectSchema'

export const DocumentSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: {
    type: String,
    enum: DocumentTypeEnum,
    required: true,
  },
  extension: {
    type: String,
    enum: DocumentExtensionEnum,
    required: true,
  },
  path: String,
  program: String,
  //program: {
  //    type: mongoose.Schema.Types.ObjectId,
  //    required: true,
  //    refer: 'Program'
  //}
})
