import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { UserInterface } from './interface/users.interface'
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<UserInterface>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save()
  }

  async findByCredential(loginUser: LoginUserDto): Promise<UserInterface> {
    const user = await this.userModel.findOne({ ...loginUser }).exec()
    return user ? user : null
  }

  async findAll(): Promise<UserInterface[]> {
    return this.userModel.find().exec()
  }
}
