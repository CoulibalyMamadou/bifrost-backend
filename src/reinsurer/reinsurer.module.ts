import { Module } from '@nestjs/common'
import { ReinsurerController } from './reinsurer.controller'
import { ReinsurerService } from './reinsurer.service'
import { DatabaseModule } from '../database/database.module'
import { reinsurerProviders } from './reinsurer.providers'
import { OfficeModule } from '../office/office.module'
import { HeadQuarterModule } from '../headQuarter/headQuarter.module'
import { OfficeService } from '../office/office.service'
import { HeadQuarterService } from '../headQuarter/headQuarter.service'

@Module({
  imports: [DatabaseModule,
    OfficeModule,
    HeadQuarterModule
  ],
  controllers: [ReinsurerController],
  providers: [
    ReinsurerService,
    OfficeService,
    HeadQuarterService,
    ...reinsurerProviders,
  ],
  exports: [...reinsurerProviders],
})
export class ReinsurerModule {}
