import { Module } from '@nestjs/common'
import { HeadQuarterService } from './headQuarter.service'
import { HeadQuarterController } from './headQuarter.controller'
import { DatabaseModule } from '../database/database.module'
import { headQuarterProviders } from './headQuarter.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [HeadQuarterController],
  providers: [HeadQuarterService, ...headQuarterProviders],
  exports: [...headQuarterProviders],
})
export class HeadQuarterModule {}
