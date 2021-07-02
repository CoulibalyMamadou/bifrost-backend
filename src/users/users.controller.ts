import { Body, Controller, Get, Logger, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto'
import { INVALID_LOGIN } from '../constant/constant'

@Controller('user')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get('/')
  async getUsers() {
    return await this.userServices.findAll()
  }

  @Post('/signIn')
  async signInUser(@Body() loginUserDto: LoginUserDto) {
    const response = await this.userServices.findByCredential(loginUserDto)
    // Logger.warn('response : ', JSON.stringify(response))
    return response == null ? { error: INVALID_LOGIN } : response
  }

  @Post('/create')
  async addUser(@Body() createUserDTO: CreateUserDto) {
    Logger.warn('user : ', JSON.stringify(createUserDTO))
    return await this.userServices.create(createUserDTO)
  }
}
