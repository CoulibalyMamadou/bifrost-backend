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
import { CreateConstraintDto, ConstraintUpdateDto } from './dto/create-constraint.dto'
import { ConstraintService } from './constraint.service'

@Controller('constraint')
export class ConstraintController {
  constructor(private constraintService: ConstraintService) {}

  @Get('/')
  async getConstraint() {
    return await this.constraintService.findAll()
  }

  @Post('/create')
  async addConstraint(@Body() createConstraintDTO: CreateConstraintDto) {
    Logger.warn('constraint : ', JSON.stringify(createConstraintDTO))
    return await this.constraintService.create(createConstraintDTO)
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateConstraint(
    @Param('id') constraintId: string,
    @Body() constraintPatch: ConstraintUpdateDto,
  ) {
    Logger.warn('Constraint field : ', JSON.stringify(constraintId))
    Logger.warn('Constraint patch : ', JSON.stringify(constraintPatch))
    return await this.constraintService.updateConstraint(constraintId, constraintPatch)
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteConstraint(@Param('id') constraintId: string) {
    Logger.warn('Constraint field : ', JSON.stringify(constraintId))
    return await this.constraintService.deleteConstraint(constraintId)
  }
}
