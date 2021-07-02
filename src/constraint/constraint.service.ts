import { Model } from 'mongoose'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConstraintInterface } from './interface/constraint.interface'
import {CONSTRAINT_MODEL} from '../constant/constant'
import {
  CreateConstraintDto,
  ConstraintSearchDto,
  ConstraintUpdateDto,
} from './dto/create-constraint.dto'

@Injectable()
export class ConstraintService {
  constructor(
    @Inject(CONSTRAINT_MODEL)
    private constraintModel: Model<ConstraintInterface>,
  ) {}

  async create(createConstraintDto: CreateConstraintDto): Promise<ConstraintInterface> {
    const createdConstraint = new this.constraintModel(createConstraintDto)
    return createdConstraint.save()
  }

  async findAll(): Promise<ConstraintInterface[]> {
    return this.constraintModel.find().exec()
  }

  async findOne(constraintSearch: ConstraintSearchDto): Promise<ConstraintInterface> {
    return this.constraintModel.findById(constraintSearch._id).exec()
  }

  // Constraint Crud
  async updateConstraint(
    constraintId: string,
    updateData: ConstraintUpdateDto,
  ): Promise<ConstraintInterface> {
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
  async deleteConstraint(constraintId: string): Promise<ConstraintInterface> {
    const constraint = this.constraintModel.findByIdAndDelete(constraintId)
    // const data = createdDocument.save();
    Logger.log('Constraint delete')
    return constraint
  }
}
