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
import { OfficeService } from './office.service'
import {
  CreateOfficeDto,
  OfficeInsurerDto,
  OfficePatchDto,
  OfficeProgramDto,
} from './dto/create-office.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'

@Controller('office')
export class OfficeController {
  constructor(private officeService: OfficeService) {}

  @Get('/all')
  async getAllOffice() {
    return await this.officeService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/quoteList/:id')
  async getAllOfficeQuoter(
      @Param('id') programId: string,
      @Request() req
  ) {
    return await this.officeService.findAllQuoter(req.user.office)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getOffice(
      @Request() req
  ) {
    return await this.officeService.findById(req.user.office)
  }

  @Get('/fill')
  async getFill() {
    return await this.officeService.findAllFill()
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async addOffice(@Body() createOfficeDTO: CreateOfficeDto) {
    Logger.warn('office : ', JSON.stringify(createOfficeDTO))
    return await this.officeService.create(createOfficeDTO)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateOffice(
    @Param('id') officeId: string,
    @Body() officePatch: OfficePatchDto,
  ) {
    Logger.warn('Office field : ', JSON.stringify(officeId))
    Logger.warn('Office patch : ', JSON.stringify(officePatch))
    return await this.officeService.updateOffice(officeId, officePatch)
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteOffice(@Param('id') officeId: string) {
    Logger.warn('Office : ', JSON.stringify(officeId))
    return await this.officeService.deleteOffice(officeId)
    // return await this.officeService.deleteProgramToOffice(officeProgram.officeId, officeProgram.programId);
  }

  @Patch('/:id/headquarter')
  @UsePipes(ValidationPipe)
  async updateHeadQuarter(
    @Param('id') officeId: string,
    @Body() headQuarterId: string,
  ) {
    Logger.warn('Office field : ', JSON.stringify(officeId))
    Logger.warn('Office patch : ', JSON.stringify(headQuarterId))
    return await this.officeService.updateHeadQuarterToOffice(
      officeId,
      headQuarterId,
    )
  }

  @Post('/:id/insurer')
  @UsePipes(ValidationPipe)
  async addInsurer(
    @Param('id') officeId: string,
    @Body() officeInsurer: OfficeInsurerDto,
  ) {
    Logger.warn('Insurer : ', JSON.stringify(officeInsurer))
    return await this.officeService.addInsurerToOffice(
      officeId,
      officeInsurer._id,
    )
    // return await this.officeService.addInsurerToOffice(officeInsurer.officeId, officeInsurer.insurerId);
  }

  @Delete('/:id/insurer')
  @UsePipes(ValidationPipe)
  async deleteInsurer(
    @Param('id') officeId: string,
    @Body() officeInsurer: OfficeInsurerDto,
  ) {
    Logger.warn('Insurer : ', JSON.stringify(officeInsurer))
    return await this.officeService.deleteInsurerFromOffice(
      officeId,
      officeInsurer._id,
    )
  }

  @Post('/:id/program')
  @UsePipes(ValidationPipe)
  async addProgram(
    @Param('id') officeId: string,
    @Body() officeProgram: OfficeProgramDto,
  ) {
    Logger.warn('Insurer : ', JSON.stringify(officeProgram))
    return await this.officeService.addProgramToOffice(
      officeId,
      officeProgram.programId,
    )
  }

  @Delete('/:id/program')
  @UsePipes(ValidationPipe)
  async deleteProgram(
    @Param('id') officeId: string,
    @Body() officeProgram: OfficeProgramDto,
  ) {
    Logger.warn('Insurer : ', JSON.stringify(officeProgram))
    return await this.officeService.deleteProgramToOffice(
      officeId,
      officeProgram.programId,
    )
    // return await this.officeService.deleteProgramToOffice(officeProgram.officeId, officeProgram.programId);
  }
}
