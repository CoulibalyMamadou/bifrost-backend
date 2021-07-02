import { Inject, Injectable, Logger } from '@nestjs/common'
import { Model, Schema, Types } from 'mongoose'
import { DocumentInterface } from './interface/document.interface'
import {
  CreateDocumentDto,
  DocumentPatchDto,
  DocumentSearchDto,
} from './dto/create-document.dto'
import { DOCUMENT_MODEL } from '../constant/constant'
import { OfficeSearchDto } from '../office/dto/create-office.dto'
import { OfficeInterface } from '../office/interface/office.interface'

@Injectable()
export class DocumentService {
  logger: Logger

  constructor(
    @Inject('DOCUMENT_MODEL')
    private documentModel: Model<DocumentInterface>, // private documentModel: Model<DocumentInterface>
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentInterface> {
    const createdDocument = new this.documentModel(createDocumentDto)
    // const data = createdDocument.save();
    Logger.log('Document created')
    return createdDocument.save()
  }

  async findAll(): Promise<DocumentInterface[]> {
    return this.documentModel.find().exec()
  }

  async findById(documentId: string): Promise<DocumentInterface> {
    return this.documentModel.findById(documentId).exec()
  }

  async findOne(documentSearch: DocumentSearchDto): Promise<DocumentInterface> {
    return this.documentModel.findById({ documentSearch }).exec()
  }

  //async updateProgramToDocument(documentId: string, programId: string ): Promise<DocumentInterface> {
  //    const createdDocument = this.documentModel.findByIdAndUpdate(
  //        documentId,
  //        {
  //            $set:
  //                {
  //                    program: programId
  //                }
  //        },
  //        { new: true, useFindAndModify: false }
  //    ).exec()
  //    // const createdDocument = new this.documentModel.findOne({...loginUser}).exec()
  //    // const data = createdDocument.save();
  //    Logger.log('Document created');
  //    return createdDocument;
  //}

  async updateDocument(
    documentId: string,
    updateData: DocumentPatchDto,
  ): Promise<DocumentInterface> {
    const createdDocument = this.documentModel
      .findByIdAndUpdate(
        documentId,
        {
          $set: updateData,
        },
        { new: true, useFindAndModify: false },
      )
      .exec()
    Logger.log('Document created')
    return createdDocument
  }

  async deleteDocument(documentId: string): Promise<DocumentInterface> {
    const program = this.documentModel.findByIdAndDelete(documentId)
    // const data = createdDocument.save();
    Logger.log('Program created')
    return program
  }
}
