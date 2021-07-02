import { Module } from '@nestjs/common'
import { QuoteConstraintService } from './quote-constraint.service'
import { QuoteConstraintController } from './quote-constraint.controller'
import { DatabaseModule } from '../database/database.module'
import { quoteConstraintProviders } from './quote-constraint.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [QuoteConstraintController],
  providers: [QuoteConstraintService, ...quoteConstraintProviders],
  exports: [...quoteConstraintProviders],
})
export class QuoteConstraintModule {}
