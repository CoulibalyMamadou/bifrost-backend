import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post, Request, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthanticateService } from './authanticate.service'
import { INVALID_LOGIN } from '../constant/constant'
import {
  AuthenticatePatchDto,
  LoginAuthanticateDto, AuthanticateSearchDto, CreateUserDto
} from './dto/authanticate.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'
import {LocalAuthGuard} from '../auth/guards/local-auth.guard'

@Controller('authanticate')
export class AuthanticateController {
  constructor(private authService: AuthanticateService) {}

  @Get('/')
  async getAuth() {
    return await this.authService.findAll()
  }

  @Get('/fill')
  async getFillAuth() {
    return await this.authService.findAllFill()
  }

  @Get('/:id')
  async getById(@Body() loginAuthDto: AuthanticateSearchDto) {
    const response = await this.authService.findById(loginAuthDto._id)
    Logger.warn('response : ', JSON.stringify(response))
    return response == null ? { error: INVALID_LOGIN } : response
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  async signInAuth(
      @Request() req,
      @Body() loginAuthDto: LoginAuthanticateDto
  ) {
    // const response = await this.authService.findByCredential(loginAuthDto)
    // Logger.warn('response : ', JSON.stringify(response))
    // return response == null ? { error: INVALID_LOGIN } : response
    Logger.log('logger connect : ', JSON.stringify(req.user))
    return req.user
  }

  @Post('/create')
  async addAuth(@Body() createUserDTO: CreateUserDto) {
    Logger.warn('insurer : ', JSON.stringify(createUserDTO))
    return await this.authService.create(createUserDTO)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateAuth(
    @Param('id') reinsurerId: string,
    @Body() reinsurerPatch: AuthenticatePatchDto,
  ) {
    Logger.warn('Auth field : ', JSON.stringify (reinsurerId))
    Logger.warn('Auth patch : ', JSON.stringify (reinsurerPatch))
    return await this.authService.updateAuth (reinsurerId, reinsurerPatch)
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteAuth(@Param('id') _id: string) {
    Logger.warn('Auth : ', JSON.stringify(_id))
    return await this.authService.deleteAuth(_id)
  }
}
