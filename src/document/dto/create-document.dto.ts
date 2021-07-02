import { DocumentExtension, DocumentType } from '../../constant/ObjectSchema'

export class CreateDocumentDto {
  title: string
  description: string
  type: string
  extension: string
  // type: DocumentType;
  // extension: DocumentExtension;
  path: string
  program: string
}

export class DocumentSearchDto {
  id: string
}

export class DocumentPatchDto {
  title?: string
  path?: string
}
