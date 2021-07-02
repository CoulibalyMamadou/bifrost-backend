import {Module} from '@nestjs/common'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {DatabaseModule} from '../database/database.module'
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
import {LocalStrategy} from './strategies/local.strategy'
import {JwtStrategy} from './strategies/jwt.strategy'

@Module({
    imports: [
        DatabaseModule,
        ReinsurerModule,
        InsurerModule,
        OfficeModule,
        HeadQuarterModule,
        AuthanticateModule,
        PassportModule,
            //.register({
            //    // defaultStrategy: 'jwt',
            //    // defaultStrategy: 'local',
            //    session: false}),
        JwtModule.register({
            secret: 'B[I@_5_-F1ux\\^u),<7R8hsu88x.2-}bO_2bSXgnT?#5YT*cn$d{HjvBW^#Jfs]j',
            // secret: process.env.JWT_SECRET,
            // 'thisismykickasssecretthatiwilltotallychangelater',
            signOptions: {
                expiresIn: 7200
                // expiresIn: 3600
                // expiresIn: process.env.EXPIRE_IN
                // expiresIn: 3600
            }
        }),
    ],
    controllers: [AuthController],
    providers: [
        ReinsurerService,
        InsurerService,
        OfficeService,
        HeadQuarterService,
        AuthanticateService,
        AuthService,
        LocalStrategy,
        JwtStrategy
        //...authProviders,
    ],
    exports: [
        // ...authProviders,
        // PassportModule,
        AuthService,
        JwtModule
    ]
})
export class AuthModule {
}
