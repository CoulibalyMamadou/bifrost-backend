import { Document, Types } from 'mongoose'
import { DocumentExtension, DocumentType } from '../../constant/ObjectSchema'

export interface DocumentInterface extends Document {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly type: string
  // readonly type: DocumentType;
  readonly extension: string
  readonly path: string
  readonly program: Types.ObjectId
  // readonly program: string;
}
