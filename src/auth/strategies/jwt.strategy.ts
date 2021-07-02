import {Injectable, Logger, UnauthorizedException} from '@nestjs/common'
import {AuthService} from '../auth.service'
import { ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
// import {JwtPayload} from '../interface/auth.interface'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'B[I@_5_-F1ux\\^u),<7R8hsu88x.2-}bO_2bSXgnT?#5YT*cn$d{HjvBW^#Jfs]j'
        })
    }

    async validate(payload: any){
        Logger.log('payload come : ', JSON.stringify(payload))
        return { userId: payload.id, username: payload.email , office: payload.office }
        // const user = await this.authService.validateUserByJwt(payload);
        // if(!user){
        //     throw new UnauthorizedException();
        // }
        // return user
    }

    async validates(payload: any) {
        Logger.log('payload decode : ', JSON.stringify(payload))
        return { userId: payload.sub, username: payload.username };
    }

}