import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {ReinsurerService} from './reinsurer.service'
import {INVALID_LOGIN} from '../constant/constant'
import {CreateReinsurerDto, LoginReinsurerDto, ReinsurerFindDto, ReinsurerPatchDto} from './dto/reinsurer.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'

@Controller('reinsurer')
export class ReinsurerController {
    constructor(private reinsurerService: ReinsurerService) {
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/')
    async getReinsurer() {
        return await this.reinsurerService.findAll()
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/fill')
    async getFillReinsurer() {
        return await this.reinsurerService.findAllFill()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/userInfo')
    async getInfo(
        @Request() req
    ) {
        Logger.warn('Reinsurer field Id : ', JSON.stringify(req.user.userId))
        return await this.reinsurerService.findByIdAndFill(req.user.userId)
    }

    // @Get('/:id')
    // async getById(@Body() loginReinsurerDto: ReinsurerFindDto) {
    //   const response = await this.reinsurerService.findById(loginReinsurerDto._id)
    //   Logger.warn('response : ', JSON.stringify(response))
    //   return response == null ? { error: INVALID_LOGIN } : response
    // }


    @Post('/signIn')
    async signInReinsurer(@Body() loginReinsurerDto: LoginReinsurerDto) {
        const response = await this.reinsurerService.findByCredential(loginReinsurerDto)
        Logger.warn('response : ', JSON.stringify(response))
        return response == null ? {error: INVALID_LOGIN} : response
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async addReinsurer(@Body() createUserDTO: CreateReinsurerDto) {
        Logger.warn('insurer : ', JSON.stringify(createUserDTO))
        return await this.reinsurerService.create(createUserDTO)
    }

    // @Post('/create/program/:id')
    // async addReinsurerProgram(
    //     @Param() reinsurerId: string,
    //     @Body() programDTO: CreateProgramDto
    // ) {
    //     Logger.warn('insurer : ', JSON.stringify(createUserDTO))
    //     return await this.reinsurerService.create(createUserDTO);
    // }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateReinsurer(
        @Request() req,
        @Param('id') reinsurerId: string,
        @Body() reinsurerPatch: ReinsurerPatchDto
    ) {
        Logger.warn('Reinsurer field : ', JSON.stringify(reinsurerId))
        Logger.warn('Reinsurer patch : ', JSON.stringify(reinsurerPatch))
        return await this.reinsurerService.updateReinsurer(req.user.userId, reinsurerPatch)
        // return await this.reinsurerService.updateReinsurer(reinsurerId, reinsurerPatch)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async deleteReinsurer(@Param('id') _id: string) {
        Logger.warn('Reinsurer : ', JSON.stringify(_id))
        return await this.reinsurerService.deleteReinsurer(_id)
    }
}
