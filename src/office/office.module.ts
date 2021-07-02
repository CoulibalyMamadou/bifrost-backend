import {Module} from '@nestjs/common'
import {OfficeController} from './office.controller'
import {OfficeService} from './office.service'
import {DatabaseModule} from '../database/database.module'
import {officeProviders} from './office.providers'
import {HeadQuarterModule} from '../headQuarter/headQuarter.module'
import {HeadQuarterService} from '../headQuarter/headQuarter.service'
import {ProgramModule} from '../program/program.module'
import {ProgramService} from '../program/program.service'

@Module({
    imports: [
        DatabaseModule,
        HeadQuarterModule,
        // ProgramModule
    ],
    controllers: [OfficeController],
    providers: [
        OfficeService,
        HeadQuarterService,
        // ProgramService,
        ...officeProviders],
    exports: [...officeProviders]
})
export class OfficeModule {
}
