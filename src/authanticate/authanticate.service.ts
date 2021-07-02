import {Inject, Injectable, Logger} from '@nestjs/common'
import {AUTHANTICATE_MODEL} from '../constant/constant'
import {AuthanticateInterface} from './interface/authanticate.interface'
import {Model} from 'mongoose'
import {
    AuthanticateFindDto,
    AuthanticateSearchDto,
    AuthenticatePatchDto,
    CreateAuthanticateDto,
    CreateUserDto,
    LoginAuthanticateDto
} from './dto/authanticate.dto'
import {InsurerService} from '../insurer/insurer.service'
import {ReinsurerService} from '../reinsurer/reinsurer.service'
import {UserType} from '../constant/ObjectSchema'
import {InsurerInterface} from '../insurer/interface/insurer.interface'
import {ReinsurerInterface} from '../reinsurer/interface/reinsurer.interface'

@Injectable()
export class AuthanticateService {
    constructor(
        @Inject(AUTHANTICATE_MODEL)
        private authModel: Model<AuthanticateInterface>,
        private insurerService: InsurerService,
        private reinsurerService: ReinsurerService
    ) {
    }

    async reinsurerCheck(reinsurerId: AuthanticateFindDto): Promise<boolean> {
        return this.authModel.exists({...reinsurerId})
    }

    async create(
        createAuthDto: CreateUserDto
    ): Promise<AuthanticateInterface | string | {}> {
        let user = null
        switch (createAuthDto.userType) {
            case UserType.INSURER:
                user = await this.insurerService.create(createAuthDto.user)
                return this.createInsurer({
                    userId: user.id,
                    email: createAuthDto.user.email,
                    username: createAuthDto.user.username,
                    password: createAuthDto.user.password,
                    userType: createAuthDto.userType
                })

            case UserType.REINSURER:
                user = await this.reinsurerService.create(createAuthDto.user)
                return this.createReinsurer({
                    userId: user.id,
                    email: createAuthDto.user.email,
                    username: createAuthDto.user.username,
                    password: createAuthDto.user.password,
                    userType: createAuthDto.userType
                })

            default:
                Logger.log(
                    "Can't created Office because office unknown : ",
                    JSON.stringify(createAuthDto)
                )
                return {
                    status: 'error',
                    response: 'type of new user is not defined'
                }
        }
    }

    async findUserInfo(
        userId: string,
        userType: string
    ): Promise<InsurerInterface| ReinsurerInterface> {
        let user = null
        switch (userType) {
            case UserType.INSURER:
                user = await this.insurerService.findInformationById(userId)
                return user

            case UserType.REINSURER:
                user = await this.reinsurerService.findInformationById(userId)
                return user

            default:
                Logger.log(
                    "Can't connect, user unknown"
                )
                return null
        }
    }

    /**
     * Insurer creation by credentials save
     * @param createAuthDto
     */
    async createInsurer(
        createAuthDto: CreateAuthanticateDto
    ): Promise<AuthanticateInterface | string | {}> {
        if (
            await this.insurerService.insurerCheck({_id: createAuthDto.userId})
        ) {
            const createdInsurer = new this.authModel(createAuthDto)
            Logger.log('Insurer created', createdInsurer.id)
            return {
                type: UserType.INSURER,
                user: createdInsurer.save()
            }
        }

        Logger.log('Error with registration. Some information are incorrect')
        return {
            status: 'error',
            message: 'Error with registration. Some information are incorrect'
        }
    }

    /**
     * Reinsurer creation by credentials save
     * @param createAuthDto
     */
    async createReinsurer(
        createAuthDto: CreateAuthanticateDto
    ): Promise<AuthanticateInterface | string | {}> {
        if (
            await this.reinsurerService.reinsurerCheck({_id: createAuthDto.userId})
        ) {
            const createdReinsurer = new this.authModel(createAuthDto)
            Logger.log('Reinsurer created', createdReinsurer.id)
            return {
                type: UserType.INSURER,
                user: createdReinsurer.save()
            }
        }

        Logger.log('Error with registration. Some information are incorrect')
        return {
            status: 'error',
            message: 'Error with registration. Some information are incorrect'
        }
    }

    async findByCredential(
        credential: LoginAuthanticateDto
    ): Promise<AuthanticateInterface> {
        Logger.log('Credentials : ', JSON.stringify(credential))
        const auth = await this.authModel.findOne({...credential}).exec()
        // if (auth) {
        //     const user = await this.findByCredentialType(auth, auth.userType)
        //     return {auth, user}
        // }
        return auth
    }

    async findByCredentialType(
        credential: CreateAuthanticateDto,
        userType: string
    ): Promise<AuthanticateInterface> {
        Logger.log('Credentials : ', JSON.stringify(credential))
        let user = null
        switch (userType) {
            case UserType.INSURER :
                user = await this.insurerService.findById(credential.userId)
                break
            case UserType.REINSURER :
                user = await this.reinsurerService.findById(credential.userId)
                break
            default:
                return null
        }

        Logger.log('auth user : ', JSON.stringify(user))
        return user
    }

    async findById(_id: string): Promise<AuthanticateInterface> {
        const user = await this.authModel.findById(_id).exec()
        return user ? user : null
    }

    async findOne(authSearch: AuthanticateSearchDto): Promise<AuthanticateInterface> {
        return this.authModel.findById(authSearch._id).exec()
    }

    async findAll(): Promise<AuthanticateInterface[]> {
        return this.authModel.find().exec()
    }

    async findAllFill(): Promise<AuthanticateInterface[]> {
        return this.authModel
            .find()
            .populate('userId')
            .exec()
    }

    // Document Crud
    async updateAuth(
        authId: string,
        updateData: AuthenticatePatchDto
    ): Promise<AuthanticateInterface> {
        const reinsurer = this.authModel.findByIdAndUpdate(
            authId,
            {
                $set: updateData
            },
            {new: true, useFindAndModify: false}
        )
        Logger.log('Auth update')
        return reinsurer
    }

    // Document Crud
    async deleteAuth(_id: string): Promise<AuthanticateInterface> {
        const auth = this.authModel.findByIdAndDelete(
            _id
        )
        Logger.log('Auth delete')
        return auth
    }
}
