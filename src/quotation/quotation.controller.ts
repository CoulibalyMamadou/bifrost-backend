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
import { CreateQuotationDto, QuotationUpdateDto } from './dto/create-quotation.dto'
import { QuotationService } from './quotation.service'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'

@Controller('quotation')
export class QuotationController {
  constructor(private quotationService: QuotationService) {}

  @Get('/')
  async getQuotation() {
    return await this.quotationService.findAll()
  }

  @Get('/:programId')
  @UseGuards(JwtAuthGuard)
  async getConstraintById(
      @Request() req,
      @Param('programId') programId: string
  ) {
    return await this.quotationService.findOneById(programId, req.user.office)
  }

  @Post('/')
  async addQuotation(@Body() createQuotationDTO: CreateQuotationDto) {
    Logger.warn('quotation : ', JSON.stringify(createQuotationDTO))
    return await this.quotationService.create(createQuotationDTO)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateQuotation(
    @Param('id') quotationId: string,
    @Body() quotationPatch: QuotationUpdateDto,
  ) {
    Logger.warn('Quotation field : ', JSON.stringify(quotationId))
    Logger.warn('Quotation patch : ', JSON.stringify(quotationPatch))
    return await this.quotationService.updateQuotation(quotationId, quotationPatch)
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteQuotation(@Param('id') quotationId: string) {
    Logger.warn('Quotation field : ', JSON.stringify(quotationId))
    return await this.quotationService.deleteQuotation(quotationId)
  }
}
