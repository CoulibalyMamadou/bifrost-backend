import {Injectable, Logger, UnauthorizedException} from '@nestjs/common'
import {AuthService} from '../auth.service'
import { ExtractJwt } from 'passport-jwt'
import { Strategy } from 'passport-local'
import {PassportStrategy} from '@nestjs/passport'
import {JwtPayload} from '../interface/auth.interface'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
            // secretOrKey: 'thisismykickasssecretthatiwilltotallychangelater'
        })
    }

    async validate(payload: JwtPayload){
        const user = await this.authService.validateUserByJwt(payload);
        Logger.log('user come : ', JSON.stringify(user))
        if(!user){
            throw new UnauthorizedException();
        }
        return user
    }

    async validates(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }

}