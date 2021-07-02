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
import {InsurerService} from './insurer.service'
import {INVALID_LOGIN} from '../constant/constant'
import {CreateInsurerDto, InsurerFindDto, InsurerPatchDto, InsurerProgramDto, LoginInsurerDto} from './dto/insurer.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'
import {ReinsurerFindDto} from '../reinsurer/dto/reinsurer.dto'

@Controller('insurer')
export class InsurerController {
    constructor(private insurerService: InsurerService) {
    }

    @Get('/')
    async getInsurer() {
        return await this.insurerService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/userInfo')
    async getInfo(
        @Request() req,
        @Body() loginInsurerDto: ReinsurerFindDto
    ) {
        Logger.warn('Reinsurer field Id : ', JSON.stringify(req.user.userId))
        return await this.insurerService.findById(req.user.userId)
   }


    @Get('/test')
    @UseGuards(JwtAuthGuard)
    testAuthRoute() {
        Logger.log('test come')
        return {
            message: 'You did it!'
        }
    }

    @Get('/fill')
    async getFillInsurer() {
        return await this.insurerService.findAllFill()
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async getById(
        @Request() req,
        @Body() loginInsurerDto: InsurerFindDto
    ) {
        // const response = await this.insurerService.findById(loginInsurerDto._id)
        const response = await this.insurerService.findByIdAndFill(req.user.userId)
        Logger.warn('response : ', JSON.stringify(response))
        return response == null ? {error: INVALID_LOGIN} : response
    }

    @Post('/signIn')
    async signInInsurer(@Body() loginInsurerDto: LoginInsurerDto) {
        const response = await this.insurerService.findByCredential(loginInsurerDto)
        Logger.warn('response : ', JSON.stringify(response))
        return response == null ? {error: INVALID_LOGIN} : response
    }

    @Post('/create')
    async addInsurer(@Body() createUserDTO: CreateInsurerDto) {
        Logger.warn('insurer : ', JSON.stringify(createUserDTO))
        return await this.insurerService.create(createUserDTO)
    }

    // @Post('/create/program/:id')
    // async addInsurerProgram(
    //     @Param() insurerId: string,
    //     @Body() programDTO: CreateProgramDto
    // ) {
    //     Logger.warn('insurer : ', JSON.stringify(createUserDTO))
    //     return await this.insurerService.create(createUserDTO);
    // }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateInsurer(
        @Request() req,
        @Param('id') insurerId: string,
        @Body() insurerPatch: InsurerPatchDto
    ) {
        // Logger.warn('Insurer field : ', JSON.stringify(insurerId))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        Logger.warn('Insurer patch : ', JSON.stringify(insurerPatch))
        return await this.insurerService.updateInsurer(req.user.userId, insurerPatch)
        // return await this.insurerService.updateInsurer(insurerId, insurerPatch)
    }

    @Post('/:id/program')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async addProgramToInsurer(
        @Request() req,
        @Param('id') insurerId: string,
        @Body() insurerProgram: InsurerProgramDto
    ) {
        Logger.warn('Insurer : ', JSON.stringify(insurerProgram))
        return await this.insurerService.addProgramToInsurer(
            req.user.userId,
            // insurerId,
            insurerProgram.programId
        )
    }

    @Post('/:id/program')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async createProgramForInsurer(
        @Request() req,
        @Param('id') insurerId: string,
        @Body() insurerProgram: InsurerProgramDto
    ) {
        Logger.warn('Insurer : ', JSON.stringify(insurerProgram))
        return await this.insurerService.addProgramToInsurer(
            req.user.userId,
            // insurerId,
            insurerProgram.programId
        )
    }

    @Delete('/:id/program')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async deleteProgramToInsurer(
        @Request() req,
        @Param('id') insurerId: string,
        @Body() insurerProgram: InsurerProgramDto
    ) {
        Logger.warn('Insurer : ', JSON.stringify(insurerProgram))
        return await this.insurerService.deleteProgramToInsurer(
            req.user.userId,
            // insurerId,
            insurerProgram.programId
        )
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async deleteInsurer(
        @Request() req,
        @Param('id') _id: string
    ) {
        // Logger.warn('Insurer : ', JSON.stringify(_id))
        Logger.warn('Insurer : ', JSON.stringify(req.user.userId))
        return await this.insurerService.deleteInsurer(_id)
    }
}
