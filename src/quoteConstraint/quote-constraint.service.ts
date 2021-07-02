import { Model } from 'mongoose'
import {Inject, Injectable, Logger, Param} from '@nestjs/common'
import { QuoteConstraintInterface } from './interface/quote-constraint.interface'
import { QUOTE_CONSTRAINT_MODEL} from '../constant/constant'
import {
  CreateQuoteConstraintDto,
  QuoteConstraintSearchDto,
  QuoteConstraintUpdateDto,
} from './dto/create-quote-constraint.dto'
import {ConstraintInterface} from '../constraint/interface/constraint.interface'

@Injectable()
export class QuoteConstraintService {
  constructor(
    @Inject(QUOTE_CONSTRAINT_MODEL)
    private constraintModel: Model<QuoteConstraintInterface>,
  ) {}

  async create(quoteConstraintDto: CreateQuoteConstraintDto): Promise<QuoteConstraintInterface> {
    const createdQuoteConstraint = new this.constraintModel(quoteConstraintDto)
    return createdQuoteConstraint.save()
  }

  async findAll(): Promise<QuoteConstraintInterface[]> {
    return this.constraintModel.find().exec()
  }

  async findOne(quoteConstraintSearch: QuoteConstraintSearchDto): Promise<QuoteConstraintInterface> {
    return this.constraintModel.findById(quoteConstraintSearch._id).exec()
  }

  async findOneById(
      programId: string,
      officeId: string
  ): Promise<QuoteConstraintInterface> {
    return this.constraintModel.findOne({
      'program': programId,
      'office': officeId
    }).exec()
  }
  // Constraint Crud
  async updateConstraint(
    constraintId: string,
    updateData: QuoteConstraintUpdateDto,
  ): Promise<QuoteConstraintInterface> {
    const constraint = this.constraintModel.findByIdAndUpdate(
      constraintId,
      {
        $set: updateData,
      },
      { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Constraint update')
    return constraint
  }

  // Document Crud
  async deleteConstraint(constraintId: string): Promise<QuoteConstraintInterface> {
    const constraint = this.constraintModel.findByIdAndDelete(constraintId)
    // const data = createdDocument.save();
    Logger.log('Constraint delete')
    return constraint
  }
}
