import { Module } from '@nestjs/common'
import { QuotationService } from './quotation.service'
import { QuotationController } from './quotation.controller'
import { DatabaseModule } from '../database/database.module'
import { quotationProviders } from './quotation.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [QuotationController],
  providers: [QuotationService, ...quotationProviders],
  exports: [...quotationProviders],
})
export class QuotationModule {}
