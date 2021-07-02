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
import { CreateQuoteConstraintDto, QuoteConstraintUpdateDto } from './dto/create-quote-constraint.dto'
import { QuoteConstraintService } from './quote-constraint.service'
import {ConstraintInterface} from '../constraint/interface/constraint.interface'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'

@Controller('quoteConstraint')
export class QuoteConstraintController {
  constructor(private quoteConstraintService: QuoteConstraintService) {}

  @Get('/')
  async getQuoteConstraint() {
    return await this.quoteConstraintService.findAll()
  }

  @Get('/:programId')
  @UseGuards(JwtAuthGuard)
  async getConstraintById(
      @Request() req,
      @Param('programId') programId: string
  ) {
    return await this.quoteConstraintService.findOneById(programId, req.user.office)
  }

  @Post('/create')
  async addQuoteConstraint(@Body() createConstraintDTO: CreateQuoteConstraintDto) {
    Logger.warn('constraint : ', JSON.stringify(createConstraintDTO))
    return await this.quoteConstraintService.create(createConstraintDTO)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateQuoteConstraint(
    @Param('id') constraintId: string,
    @Body() quoteConstraintPatch: QuoteConstraintUpdateDto,
  ) {
    Logger.warn('Constraint field : ', JSON.stringify(constraintId))
    Logger.warn('Constraint patch : ', JSON.stringify(quoteConstraintPatch))
    return await this.quoteConstraintService.updateConstraint(constraintId, quoteConstraintPatch)
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteQuoteConstraint(@Param('id') constraintId: string) {
    Logger.warn('Constraint field : ', JSON.stringify(constraintId))
    return await this.quoteConstraintService.deleteConstraint(constraintId)
  }
}
