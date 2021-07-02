import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { HeadQuarterModule } from './headQuarter/headQuarter.module'
import { OfficeModule } from './office/office.module'
import { ProgramModule } from './program/program.module'
import { InsurerModule } from './insurer/insurer.module'
import { LayerModule } from './layer/layer.module'
import { DocumentModule } from './document/document.module'
import {ConstraintModule} from './constraint/constraint.module'
import {QuoteConstraintModule} from './quoteConstraint/quote-constraint.module'
import {QuotationModule} from './quotation/quotation.module'
import {ReinsurerModule} from './reinsurer/reinsurer.module'
import {AuthanticateModule} from './authanticate/authanticate.module'
import {AuthModule} from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(
        {
      envFilePath: `.${process.env.TARGET || 'dev'}.env`,
      // envFilePath: '.dev.env',
      isGlobal: true
    }
    ),
    DatabaseModule,
    AuthModule,
    AuthanticateModule,
    UsersModule,
    HeadQuarterModule,
    OfficeModule,
    InsurerModule,
    ReinsurerModule,
    ProgramModule,
    LayerModule,
    QuoteConstraintModule,
    ConstraintModule,
    DocumentModule,
    QuotationModule,
  ],
})
export class AppModule {}
