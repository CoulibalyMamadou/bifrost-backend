import {Module} from '@nestjs/common'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {DatabaseModule} from '../database/database.module'
import {authProviders} from './auth.providers'
import {InsurerService} from '../insurer/insurer.service'
import {ReinsurerService} from '../reinsurer/reinsurer.service'
import {InsurerModule} from '../insurer/insurer.module'
import {ReinsurerModule} from '../reinsurer/reinsurer.module'
import {OfficeModule} from '../office/office.module'
import {OfficeService} from '../office/office.service'
import {HeadQuarterService} from '../headQuarter/headQuarter.service'
import {HeadQuarterModule} from '../headQuarter/headQuarter.module'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {AuthanticateService} from '../authanticate/authanticate.service'
import {AuthanticateModule} from '../authanticate/authanticate.module'
import {JwtStrategy} from './strategies/jwt.strategy'
import {LocalStrategy} from './strategies/local.strategy'

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        // .register({
        //     defaultStrategy: 'jwt',
        //     session: false}),
        // JwtModule.register({
        //     secret: 'thisismykickasssecretthatiwilltotallychangelater',
        //     signOptions: {
        //         expiresIn: 3600
        //     }
        // }),
        // InsurerModule,
        // ReinsurerModule,
        // OfficeModule,
        AuthanticateModule,
        HeadQuarterModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        InsurerService,
        ReinsurerService,
        OfficeService,
        AuthanticateService,
        HeadQuarterService,
        //...authProviders,
        JwtStrategy,
        LocalStrategy
    ],
    exports: [
        // ...authProviders,
        PassportModule,
        // JwtModule
    ]
})
export class AuthModule {
}
