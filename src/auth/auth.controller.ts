import {Body, Controller, Logger, Post, Request, UseGuards} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginAuthDto} from './dto/auth.dto'
import {LocalAuthGuard} from './guards/local-auth.guard'
import {JwtAuthGuard} from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    // @UseGuards(LocalAuthGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    async credentials(
        @Request() req,
        @Body() loginUserDto: LoginAuthDto
    ) {
      Logger.log('logger connect : ', JSON.stringify(req.user))
      // await this.authService.validateUser(loginUserDto)
      return req.user
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async loginA(@Request() req) {
        return req.user
    }
}
