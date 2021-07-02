import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { HeadQuarterService } from './headQuarter.service'
import {
  CreateHeadQuarterDto,
  HeadQuarterCrudOfficeDto,
  HeadQuarterDto,
  HeadQuarterFindDto,
  HeadQuarterPatchDto,
} from './dto/create-headQuarter.dto'

@Controller('headQuarter')
export class HeadQuarterController {
  constructor(private headQuarterService: HeadQuarterService) {}

  @Get('/')
  async getHeadQuarter() {
    return await this.headQuarterService.findAll()
  }

  @Get('/fill')
  async getHeadQuarterFill() {
    return await this.headQuarterService.findAllFill()
  }

  @Get('/:id/fill')
  async getFill(@Param('id') headQuarterId: string) {
    return await this.headQuarterService.findAndFill(headQuarterId)
  }

  @Get('/:id')
  async getById(@Param('id') headQuarter: HeadQuarterFindDto) {
    // return await this.headQuarterService.findAll();
    return await this.headQuarterService.findOne(headQuarter)
  }

  @Post('/create')
  async addHeadQuarter(@Body() createHeadQuarterDTO: CreateHeadQuarterDto) {
    Logger.warn('headQuarter : ', JSON.stringify(createHeadQuarterDTO))
    return await this.headQuarterService.create(createHeadQuarterDTO)
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteHeadQuarter(@Param('id') headQuarterId: string) {
    Logger.warn('HeadQuarter : ', JSON.stringify(headQuarterId))
    return await this.headQuarterService.deleteHeadQuarter(headQuarterId)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateHeadQuarter(
    @Param('id') headQuarterId: string,
    @Body() headQuarterPatch: HeadQuarterPatchDto,
  ) {
    Logger.warn('HeadQuarter field : ', JSON.stringify(headQuarterId))
    Logger.warn('HeadQuarter patch : ', JSON.stringify(headQuarterPatch))
    return await this.headQuarterService.updateHeadQuarter(
      headQuarterId,
      headQuarterPatch,
    )
  }

  @Post('/:id/office')
  @UsePipes(ValidationPipe)
  async addOfficeToHeadQuarter(
    @Param('id') headQuarterId: string,
    @Body() office: HeadQuarterCrudOfficeDto,
  ) {
    Logger.warn('HeadQuarter field : ', JSON.stringify(headQuarterId))
    Logger.warn('HeadQuarter patch : ', JSON.stringify(headQuarterId))
    return await this.headQuarterService.addOfficeToHeadQuarter(
      headQuarterId,
      office.id,
    )
  }

  @Delete('/:id/office/')
  @UsePipes(ValidationPipe)
  async deleteOfficeFromHeadQuarter(
    @Param('id') headQuarterId: string,
    @Body() headQuarterOffice: HeadQuarterCrudOfficeDto,
  ) {
    Logger.warn('HeadQuarter : ', JSON.stringify(headQuarterOffice))
    return await this.headQuarterService.deleteOfficeToHeadQuarter(
      headQuarterId,
      headQuarterOffice.id,
    )
  }
}
