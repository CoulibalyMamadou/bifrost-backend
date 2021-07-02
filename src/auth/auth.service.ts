import {Injectable, Logger, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
// import {ReinsurerService} from '../reinsurer/reinsurer.service'
import {LoginUserDto} from '../users/dto/create-user.dto'
import {AuthanticateService} from '../authanticate/authanticate.service'
import {JwtPayload} from './interface/auth.interface'
import {AuthanticateInterface} from '../authanticate/interface/authanticate.interface'

@Injectable()
export class AuthService {
    constructor(
        // @Inject(AUTH_MODEL)
        // private authModel: Model<AuthInterface>,
        // private insurerService: InsurerService,
        // private reinsurerService: ReinsurerService,
        private authService: AuthanticateService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(loginAttempt: LoginUserDto) {
        // This will be used for the initial login
        Logger.log('loginAttempt : ', JSON.stringify(loginAttempt))
        const auth = await this.authService.findByCredential(loginAttempt)
            .then((user) => {
                Logger.log('message comme in : ', JSON.stringify(user))
                if (user) {
                    return user
                } else {
                    throw new UnauthorizedException()
                }
            })
        const user = await this.authService.findUserInfo(auth.userId, auth.userType)
        const token = this.createJwtPayload(auth, user.office )
        Logger.log('enter in JWT: ', JSON.stringify({auth, user}))
        Logger.log('Token  end: ', JSON.stringify(token))
        return {
            user,
            userType: auth.userType,
            token
        }
    }

    createJwtPayload(user: AuthanticateInterface, office: string) {
        const data: JwtPayload = {
            id: user.userId,
            email: user.email,
            office: office,
            type: user.userType
        }
        // const jwt = data
        const jwt = this.jwtService.sign(data)

        return {
            expiresIn: 3600,
            token: jwt
        }

    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.userId}
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }


    // async validateUser(username: string, pass: string): Promise<any> {
    //     const user = await this.usersService.findOne(username);
    //     if (user && user.password === pass) {
    //         const { password, ...result } = user;
    //         return result;
    //     }
    //     return null;
    // }
}
