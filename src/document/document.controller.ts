import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post, Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { DocumentService } from './document.service'
import { CreateDocumentDto, DocumentPatchDto } from './dto/create-document.dto'

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get('/')
  async getDocument() {
    return await this.documentService.findAll()
  }

  @Get('/:id')
  async getDocumentById() {
    return await this.documentService.findAll()
  }

  @Get('/file')
  async DownloadFile(@Res() res) {
    try {
      return res.sendFile('document.pdf', { root: './src/document/files' });
    }catch(e) {
    }
  }

  @Post('/create')
  async addDocument(@Body() createDocumentDTO: CreateDocumentDto) {
    Logger.warn('document : ', JSON.stringify(createDocumentDTO))
    return await this.documentService.create(createDocumentDTO)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateDocument(
    @Param('id') documentId: string,
    @Body() documentPatch: DocumentPatchDto,
  ) {
    Logger.warn('Document field : ', JSON.stringify(documentId))
    Logger.warn('Document patch : ', JSON.stringify(documentPatch))
    return await this.documentService.updateDocument(documentId, documentPatch)
  }

  //@Patch('/:id')
  //@UsePipes(ValidationPipe)
  //async updateProgramDocument(
  //    @Param('id') documentId: string,
  //    @Body() programId: string
  //) {
  //    Logger.warn('Document field : ', JSON.stringify(documentId))
  //    Logger.warn('Document patch : ', JSON.stringify(programId))
  //    return await this.documentService.updateProgramToDocument(documentId, programId);
  //}

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteDocument(@Param('id') documentId: string) {
    Logger.warn('Document field : ', JSON.stringify(documentId))
    return await this.documentService.deleteDocument(documentId)
  }
}
