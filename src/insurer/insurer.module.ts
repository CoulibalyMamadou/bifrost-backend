import { Module } from '@nestjs/common'
import { InsurerController } from './insurer.controller'
import { InsurerService } from './insurer.service'
import { DatabaseModule } from '../database/database.module'
import { insurerProviders } from './insurer.providers'
import { OfficeModule } from '../office/office.module'
import { HeadQuarterModule } from '../headQuarter/headQuarter.module'
import { OfficeService } from '../office/office.service'
import { HeadQuarterService } from '../headQuarter/headQuarter.service'
import {LocalStrategy} from '../auth/strategies/local.strategy'
import {JwtStrategy} from '../auth/strategies/jwt.strategy'
import {AuthService} from '../auth/auth.service'
import {AuthModule} from '../auth/auth.module'
// import {PassportModule} from '@nestjs/passport'

@Module({
  imports: [
      DatabaseModule,
    OfficeModule,
    HeadQuarterModule,
      // AuthModule
    // PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [InsurerController],
  providers: [
    InsurerService,
    OfficeService,
    HeadQuarterService,
    // AuthService,
    ...insurerProviders,
  ],
  exports: [...insurerProviders],
})
export class InsurerModule {}
