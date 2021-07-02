import { Model } from 'mongoose'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { QuotationInterface } from './interface/quotation.interface'
import { QUOTATION_MODEL } from '../constant/constant'
import {
  CreateQuotationDto,
  QuotationSearchDto,
  QuotationUpdateDto,
} from './dto/create-quotation.dto'
import {QuoteConstraintInterface} from '../quoteConstraint/interface/quote-constraint.interface'

@Injectable()
export class QuotationService {
  constructor(
    @Inject(QUOTATION_MODEL)
    private quotationModel: Model<QuotationInterface>,
  ) {}

  async create(quotationDto: CreateQuotationDto): Promise<QuotationInterface> {
    const createdQuotation = new this.quotationModel(quotationDto)
    return createdQuotation.save()
  }

  async findAll(): Promise<QuotationInterface[]> {
    return this.quotationModel.find().exec()
  }

  async findOne(quotationSearch: QuotationSearchDto): Promise<QuotationInterface> {
    return this.quotationModel.findById(quotationSearch._id).exec()
  }

  async findOneById(
      programId: string,
      officeId: string
  ): Promise<QuotationInterface> {
    return this.quotationModel.findOne({
      'program': programId,
      'office': officeId
    }).exec()
  }

  // Constraint Crud
  async updateQuotation(
    constraintId: string,
    updateData: QuotationUpdateDto,
  ): Promise<QuotationInterface> {
    const constraint = this.quotationModel.findByIdAndUpdate(
      constraintId,
      {
        $set: updateData,
      },
      { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Quotation update')
    return constraint
  }

  // Document Crud
  async deleteQuotation(constraintId: string): Promise<QuotationInterface> {
    const constraint = this.quotationModel.findByIdAndDelete(constraintId)
    // const data = createdDocument.save();
    Logger.log('Quotation delete')
    return constraint
  }
}
