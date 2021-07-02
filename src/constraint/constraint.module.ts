import { Module } from '@nestjs/common'
import { ConstraintService } from './constraint.service'
import { ConstraintController } from './constraint.controller'
import { DatabaseModule } from '../database/database.module'
import { constraintProviders } from './constraint.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [ConstraintController],
  providers: [ConstraintService, ...constraintProviders],
  exports: [...constraintProviders],
})
export class ConstraintModule {}
