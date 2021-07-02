import { Inject, Injectable, Logger } from '@nestjs/common'
import { Model } from 'mongoose'
import { HeadQuarterInterface } from './interface/headQuarter.interface'
import {
  CreateHeadQuarterDto,
  HeadQuarterFindDto,
  HeadQuarterPatchDto,
} from './dto/create-headQuarter.dto'
import { HEAD_QUARTER_MODEL } from '../constant/constant'

@Injectable()
export class HeadQuarterService {
  constructor(
    @Inject(HEAD_QUARTER_MODEL)
    private headQuarterModel: Model<HeadQuarterInterface>,
  ) {}

  async insurerCheck(headQuarterId: HeadQuarterFindDto): Promise<Boolean> {
    return this.headQuarterModel.exists({ ...headQuarterId })
  }

  async create(
    createCompanyDto: CreateHeadQuarterDto,
  ): Promise<HeadQuarterInterface> {
    const createdHeadQuarter = new this.headQuarterModel(createCompanyDto)
    return createdHeadQuarter.save()
  }

  async findAll(): Promise<HeadQuarterInterface[]> {
    return this.headQuarterModel.find().exec()
  }
  async findAllFill(): Promise<HeadQuarterInterface[]> {
    return this.headQuarterModel
      .find()
      .populate({ path: 'office', model: 'Office' })
      .exec()
  }

  async findAndFill(_id: string): Promise<HeadQuarterInterface> {
    return this.headQuarterModel
      .findById(_id)
      .populate('office', '-__v')
      .exec()
  }

  async findOne(_id: HeadQuarterFindDto): Promise<HeadQuarterInterface> {
    return await this.headQuarterModel
      .findById({ _id })
      .populate({ path: 'office', model: 'Office' })
      .exec()
  }

  // headQuarter Crud
  async updateHeadQuarter(
    headQuarterId: string,
    updateData: HeadQuarterPatchDto,
  ): Promise<HeadQuarterInterface> {
    const layer = this.headQuarterModel.findByIdAndUpdate(
      headQuarterId,
      {
        $set: updateData,
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('headQuarter update')
    return layer
  }

  // ReinsurerHead Quarter Crud
  async addOfficeToHeadQuarter(
    _headQuarterId: string,
    _officeId: string,
  ): Promise<HeadQuarterInterface> {
    const office = this.headQuarterModel.findByIdAndUpdate(
      _headQuarterId,
      {
        $push: {
          office: _officeId,
        },
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Office Added to Office')
    return office
  }

  async deleteHeadQuarter(
    _headQuarterId: string,
  ): Promise<HeadQuarterInterface> {
    const headQuarter = this.headQuarterModel.findByIdAndDelete(_headQuarterId)
    Logger.log('Program deleted')
    return headQuarter
  }

  async deleteOfficeToHeadQuarter(
    _headQuarterId: string,
    _officeId: string,
  ): Promise<HeadQuarterInterface> {
    const headQuarter = this.headQuarterModel.findByIdAndUpdate(
      _headQuarterId,
      {
        $pull: {
          office: _officeId,
        },
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Program deleted')
    return headQuarter
  }
}
