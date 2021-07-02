import {Inject, Injectable, Logger, UnauthorizedException} from '@nestjs/common'
import {AUTH_MODEL} from '../constant/constant'
import {AuthInterface, JwtPayload} from './interface/auth.interface'
import {Model} from 'mongoose'
// import {JwtService} from '@nestjs/jwt'
import {InsurerService} from '../insurer/insurer.service'
import {ReinsurerService} from '../reinsurer/reinsurer.service'
import {LoginUserDto} from '../users/dto/create-user.dto'
import {AuthanticateService} from '../authanticate/authanticate.service'

@Injectable()
export class AuthService {
    constructor(
        // @Inject(AUTH_MODEL)
        // private authModel: Model<AuthInterface>,
        private insurerService: InsurerService,
        // private reinsurerService: ReinsurerService,
        private authService: AuthanticateService,
        // private jwtService: JwtService
    ) {
    }

    async validateUserByPassword(loginAttempt: LoginUserDto) {
        // This will be used for the initial login
        Logger.log('message comme in loginAttempt : ', JSON.stringify(loginAttempt))

        return await this.authService.findByCredential(loginAttempt)
            .then((auth) => {
                Logger.log('message comme in : ', JSON.stringify(auth))
                    if (auth) {
                        // If there is a successful match, generate a JWT for the user
                        const token = this.createJwtPayload(auth)
                        // resolve(this.createJwtPayload(userToAttempt))
                        Logger.log('Token comme in : ', JSON.stringify(token))

                        return {
                            user: auth,
                            token
                        }
                    } else {
                        throw new UnauthorizedException()
                    }
                // if (!auth) throw new UnauthorizedException()
            })
    }

    async validateUserByJwt(payload: JwtPayload) {
        // This will be used when the user has already logged in and has a JWT
        Logger.log('user payload : ', JSON.stringify(payload))
        const user = await this.insurerService.findOneByEmail(payload)
        Logger.log('user to validate : ', JSON.stringify(user))

        if (user) {
            return user
            // return this.createJwtPayload(user)
        } else {
            throw new UnauthorizedException()
        }

    }

    createJwtPayload(user) {
        const data: JwtPayload = {
            email: user.email
        }
        const jwt = data
        // const jwt = this.jwtService.sign(data)

        return {
            expiresIn: 3600,
            token: jwt
        }

    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            accessToken: payload,
            // accessToken: this.jwtService.sign(payload),
        }
    }

}
