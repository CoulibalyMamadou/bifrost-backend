import { Module } from '@nestjs/common'
import { DocumentController } from './document.controller'
import { DocumentService } from './document.service'
import { DatabaseModule } from '../database/database.module'
import { documentProviders } from './document.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentController],
  providers: [DocumentService, ...documentProviders],
  exports: [...documentProviders],
})
export class DocumentModule {}
