import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post, Req, Request,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import {ProgramService} from './program.service'
import {
    CreateProgramDto,
    PeriodSetCrudDto,
    programDto, ProgramPatchConstraintDto,
    ProgramPatchDto,
    ProgramPatchLayerDto,
    QuoterListSetCrudDto,
    TargetCrudDto,
    TargetSetCrudDto
} from './dto/program.dto'
import {CreateQuoteConstraintDto} from '../quoteConstraint/dto/create-quote-constraint.dto'
import {CreateQuotationDto} from '../quotation/dto/create-quotation.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'

@Controller('program')
export class ProgramController {
    constructor(private programService: ProgramService) {
    }

    @Get('/')
    async getProgram() {
        const date = new Date()
        Logger.log(' date 7 : ' + new Date(date.getDate() + 7))
        Logger.log(' date 7 : ' + date.setDate(date.getDate() + 7))
        return await this.programService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/quoteList/:id')
    async getAllOfficeQuoter(
        @Param('id') programId: string,
        @Request() req
    ) {
        return await this.programService.findProgramQuoterListById(programId)
    }

    @Get('/list')
    async getProgramList() {
        return await this.programService.findAllList()
    }

    @Get('/list/fill')
    async getProgramListFill() {
        return await this.programService.findAllListFill()
    }

    @Get('/office/list/fill')
    @UseGuards(JwtAuthGuard)
    async getProgramListFillByOffice(@Request() req) {
        return await this.programService.findAllListFillByOffice(req.user.office)
    }

    @Get('/reinsurer/list/fill')
    @UseGuards(JwtAuthGuard)
    async getReinsurerProgramListFill(@Request() req) {
        return await this.programService.findReinsurerAllProgramListFill(req.user.office)
    }

    @Get('/fill')
    @UseGuards(JwtAuthGuard)
    async getFillProgram() {
        return await this.programService.findAllFill()
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async getProgramById(
        @Request() req,
        @Param('id') programId: string
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.findById(programId)
    }

    @Get('/:id/fill')
    @UseGuards(JwtAuthGuard)
    async getProgramFillById(
        @Request() req,
        @Param('id') programId: string
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.findFillById(programId)
    }

    @Get('/quoter/list/:id')
    @UseGuards(JwtAuthGuard)
    async getProgramQuoterListById(
        @Request() req,
        @Param('id') programId: string
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.findQuoterListById(programId)
    }

    @Get('/status/:id')
    @UseGuards(JwtAuthGuard)
    async getProgramStatusById(
        @Request() req,
        @Param('id') programId: string
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        // const canGo = await this.programService.checkOfficeRightsOnProgram(programId, req.user.office)
        // const status = await this.programService.getProgramStatus(programId)
        // Logger.warn('Insurer canGo : ', JSON.stringify(canGo))
        return await this.programService.getProgramStatus(programId, req.user.office)
    }

    @Get('/quoter/list/fill/:id')
    @UseGuards(JwtAuthGuard)
    async getProgramQuoterListFillById(
        @Request() req,
        @Param('id') programId: string
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.findQuoterListFillById(programId)
    }

    @Get('/:id/layer/fill')
    @UseGuards(JwtAuthGuard)
    async getProgramLayerFillById(
        @Request() req,
        @Param('id') programId: string
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.findLayersFillById(programId)
    }

    @Get('/constraint/fill/:id')
    @UseGuards(JwtAuthGuard)
    async getProgramConstraintFillById(
        @Request() req,
        @Param('id') programId: string
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.findConstraintFillById(programId)
    }

    @Get('/quoteConstraint/:programId')
    @UseGuards(JwtAuthGuard)
    async getProgramQuoteConstraint(
        @Request() req,
        @Param('programId') programId: string
        // @Param('insurerId') insurerId: string
    ) {
        Logger.warn('insurerId : ', JSON.stringify(req.user.userId))
        return await this.programService.findQuoteConstraintFillById(programId, req.user.office)
    }

    @Get('/quotation/:programId')
    @UseGuards(JwtAuthGuard)
    async getProgramQuote(
        @Request() req,
        @Param('programId') programId: string
        // @Param('insurerId') insurerId: string
    ) {
        Logger.warn('insurerId : ', JSON.stringify(req.user.userId))
        // Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.findQuotationFillById(programId, req.user.office)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async addProgram(
        @Request() req,
        @Body() createProgramDTO: CreateProgramDto
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        Logger.warn('Insurer field req user  : ', JSON.stringify(req.user))
        Logger.warn('Insurer field req.query  : ', JSON.stringify(req.query))
        Logger.warn('Insurer field req.body  : ', JSON.stringify(req.body))
        Logger.warn('Insurer field req.params  : ', JSON.stringify(req.params))
        Logger.warn('Insurer field createProgramDTO : ', JSON.stringify(createProgramDTO))
        // createProgramDTO.insurer = req.user.userId
        return await this.programService.create({ ...createProgramDTO, office: req.user.office})
    }

    @Post('/quoteConstraint/:id')
    @UseGuards(JwtAuthGuard)
    async addProgramQuoteConstraint(
        @Request() req,
        @Param('id') programId: string,
        @Body() quoteConstraintDto: CreateQuoteConstraintDto) {
        Logger.warn('quoteConstraintDto : ', JSON.stringify(quoteConstraintDto))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.office))
        return await this.programService.createProgramQuoteConstraint(req.user.office, programId, { ...quoteConstraintDto, office: req.user.office })
    }

    @Post('/quotation/:id')
    @UseGuards(JwtAuthGuard)
    async addProgramQuote(
        @Request() req,
        @Param('id') programId: string,
        @Body() quotationDto: CreateQuotationDto) {
        Logger.warn('quoteConstraintDto : ', JSON.stringify(quotationDto))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.office))
        return await this.programService.createProgramQuotation(req.user.office, programId, { ...quotationDto, office: req.user.office })
    }

    @Post('/checkConstraint/:id')
    @UseGuards(JwtAuthGuard)
    async checkProgramQuote(
        @Request() req,
        @Param('id') programId: string
    ) {
        // createUserDTO =this.programService.createP(createUserDTO)
        // Logger.warn('insurer : ', JSON.stringify(quoteConstraintDto))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.quoteConstraintCheck(programId, req.user.office )
    }

    @Post('/save')
    @UseGuards(JwtAuthGuard)
    async saveProgram(
        @Request() req,
        @Body() saveProgramDTO: any
    ) {
        //createUserDTO =this.programService.createP(createUserDTO)
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.save(saveProgramDTO)
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateProgram(
        @Request() req,
        @Param('id') programId: string,
        @Body() programPatch: ProgramPatchDto
    ) {
        Logger.warn('Program field : ', JSON.stringify(programId))
        Logger.warn('Program patch : ', JSON.stringify(programPatch))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.updateProgram(programId, programPatch)
    }

    @Patch('/layer/patch')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateProgramLayers(
        @Request() req,
        @Body() programPatch: ProgramPatchLayerDto
    ) {
        Logger.warn('Program layers patch : ', JSON.stringify(programPatch))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.updateProgramLayers(programPatch)
    }

    @Patch('/constraint/')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateProgramConstraint(
        @Request() req,
        @Body() programPatch: ProgramPatchLayerDto
    ) {
        Logger.warn('Program layers patch : ', JSON.stringify(programPatch))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.updateProgramLayers(programPatch)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async deleteProgram(
        @Request() req,
        @Param('id') programId: string,
        @Body('_id') insurerId: string
    ) {
        Logger.warn('Program : ', JSON.stringify(programId))
        Logger.warn('Insurer : ', JSON.stringify(insurerId))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.deleteProgram(programId, req.user.userId)
    }

    @Patch('/insurer/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateInsurer(
        @Request() req,
        @Param('id') programId: string,
        @Body() insurerId: TargetSetCrudDto
    ) {
        Logger.warn('program field : ', JSON.stringify(programId))
        Logger.warn('insurer patch : ', JSON.stringify(insurerId))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.updateInsurerToProgram(
            programId,
            insurerId._idOld,
            req.user.userId
            // insurerId._id
        )
    }

    @Patch('/quoter/list/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updateQuoterList(
        @Request() req,
        @Param('id') programId: string,
        @Body() quoterList: QuoterListSetCrudDto
    ) {
        Logger.warn('program field : ', JSON.stringify(programId))
        Logger.warn('insurer patch : ', JSON.stringify(quoterList))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.updateQuoterList(
            programId,
            quoterList
        )
    }

    @Post('/:target/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async addToProgram(
        @Request() req,
        @Param('id') programId: string,
        @Param('target') target: string,
        @Body() targetProgram: TargetCrudDto
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        switch (target) {
            case programDto.DOCUMENT:
                Logger.warn('Program : ', JSON.stringify(targetProgram))
                return await this.programService.addDocumentToProgram(
                    programId,
                    targetProgram._id
                )
            case programDto.LAYER:
                Logger.warn('Layer : ', JSON.stringify(targetProgram))
                return await this.programService.addLayerToProgram(
                    programId,
                    targetProgram._id
                )
            default:
                return {
                    error: 'requete non traiter',
                    message: ' option demander  est inconnu et impossible a satisfaire'
                }
        }
    }

    @Post('/create/constraint/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async createConstraint(
        @Request() req,
        @Param('id') programId: string,
        @Body() constraintProgram: ProgramPatchConstraintDto
    ) {
        Logger.warn('constraint : ', JSON.stringify(constraintProgram))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.createConstraint(
            programId,
            constraintProgram
        )
    }

    @Patch('/:id/period')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async updatePeriodToProgram(
        @Request() req,
        @Param('id') programId: string,
        @Param('target') target: string,
        @Body() periodProgram: PeriodSetCrudDto
    ) {
        Logger.warn('Program : ', JSON.stringify(periodProgram))
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        return await this.programService.updatePeriodProgram(
            programId,
            periodProgram.target,
            periodProgram.period
        )
    }

    @Delete('/:target/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async deleteToProgram(
        @Request() req,
        @Param('id') programId: string,
        @Param('target') target: string,
        @Body() targetProgram: TargetCrudDto
    ) {
        Logger.warn('Insurer field : ', JSON.stringify(req.user.userId))
        switch (target) {
            case programDto.DOCUMENT:
                Logger.warn('Program : ', JSON.stringify(targetProgram))
                return await this.programService.deleteDocumentToProgram(
                    programId,
                    targetProgram._id
                )
            case programDto.LAYER:
                Logger.warn('Program : ', JSON.stringify(targetProgram))
                return await this.programService.deleteLayerToProgram(
                    programId,
                    targetProgram._id
                )
            default:
                return {
                    error: 'requete non traiter',
                    message: ' option demander  est inconnu et impossible a satisfaire'
                }
        }
    }
}
