import {Strategy} from 'passport-local'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable, Logger, UnauthorizedException} from '@nestjs/common'
import {AuthService} from '../auth.service'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // super()
        // Must be Override for update parameter for our use case
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string): Promise<any> {
        // Logger.log('{email, password} : ', JSON.stringify({email, password}))
        // const user = {username, password}
        const user = await this.authService.validateUser({email, password})
        Logger.log('validate login : ', JSON.stringify(user))
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}