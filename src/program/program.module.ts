import { Module } from '@nestjs/common'
import { ProgramService } from './program.service'
import { ProgramController } from './program.controller'
import { programProviders } from './program.providers'
import { DatabaseModule } from '../database/database.module'
import { DocumentService } from '../document/document.service'
import { DocumentModule } from '../document/document.module'
import { LayerService } from '../layer/layer.service'
import { LayerModule } from '../layer/layer.module'
import { InsurerService } from '../insurer/insurer.service'
import { InsurerModule } from '../insurer/insurer.module'
import { OfficeModule } from '../office/office.module'
import { OfficeService } from '../office/office.service'
import { HeadQuarterModule } from '../headQuarter/headQuarter.module'
import { HeadQuarterService } from '../headQuarter/headQuarter.service'
import {ConstraintModule} from '../constraint/constraint.module'
import {ConstraintService} from '../constraint/constraint.service'
import {QuoteConstraintService} from '../quoteConstraint/quote-constraint.service'
import {QuoteConstraintModule} from '../quoteConstraint/quote-constraint.module'
import {QuotationService} from '../quotation/quotation.service'
import {QuotationModule} from '../quotation/quotation.module'
import {ReinsurerService} from '../reinsurer/reinsurer.service'
import {ReinsurerModule} from '../reinsurer/reinsurer.module'

@Module({
  imports: [
    DatabaseModule,
    DocumentModule,
    LayerModule,
    ConstraintModule,
    InsurerModule,
    ReinsurerModule,
    OfficeModule,
    HeadQuarterModule,
    QuoteConstraintModule,
    QuotationModule
  ],
  controllers: [ProgramController],
  providers: [
    ProgramService,
    DocumentService,
    InsurerService,
    ReinsurerService,
    LayerService,
    ConstraintService,
    OfficeService,
    HeadQuarterService,
    QuoteConstraintService,
    QuotationService,
    ...programProviders,
  ],
  exports: [...programProviders],
})
export class ProgramModule {}
