import { Module } from '@nestjs/common'
import { AuthanticateController } from './authanticate.controller'
import { AuthanticateService } from './authanticate.service'
import { DatabaseModule } from '../database/database.module'
import { authanticateProviders } from './authanticate.providers'
import {InsurerService} from '../insurer/insurer.service'
import {ReinsurerService} from '../reinsurer/reinsurer.service'
import {InsurerModule} from '../insurer/insurer.module'
import {ReinsurerModule} from '../reinsurer/reinsurer.module'
import {OfficeModule} from '../office/office.module'
import {OfficeService} from '../office/office.service'
import {HeadQuarterService} from '../headQuarter/headQuarter.service'
import {HeadQuarterModule} from '../headQuarter/headQuarter.module'

@Module({
  imports: [
      DatabaseModule,
    InsurerModule,
    ReinsurerModule,
    OfficeModule,
    HeadQuarterModule
  ],
  controllers: [AuthanticateController],
  providers: [
    AuthanticateService,
    InsurerService,
    ReinsurerService,
    OfficeService,
    HeadQuarterService,
    ...authanticateProviders,
  ],
  exports: [...authanticateProviders],
})
export class AuthanticateModule {}
