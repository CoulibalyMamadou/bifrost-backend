import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Request,
  Post, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  LoginAuthDto
} from './dto/auth.dto'
import {LocalAuthGuard} from './guards/local-auth.guard'
import {JwtAuthGuard} from './guards/jwt-auth.guard'
import {AuthGuard} from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Body() loginUserDto: LoginAuthDto){
    return await this.authService.validateUserByPassword(loginUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() req) {
    return req
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginA(@Request() req) {
    return req.user
  }
}
