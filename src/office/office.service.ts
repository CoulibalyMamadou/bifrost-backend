import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  CreateOfficeDto,
  OfficeFindDto,
  OfficePatchDto, OfficeProgramQuotationDto, OfficeProgramQuoteConstraintDto,
  OfficeSearchDto
} from './dto/create-office.dto'
import { OFFICE_MODEL } from '../constant/constant'
import { Model } from 'mongoose'
import { OfficeInterface } from './interface/office.interface'
import { HeadQuarterService } from '../headQuarter/headQuarter.service'
import {ProgramQuoteConstraintDto} from '../program/dto/program.dto'
import {ProgramService} from '../program/program.service'

@Injectable()
export class OfficeService {
  constructor(
    @Inject(OFFICE_MODEL)
    private officeModel: Model<OfficeInterface>,
    private headQuarterService: HeadQuarterService,
    // private programService: ProgramService,
  ) {}

  async create(createOfficeDto: CreateOfficeDto): Promise<OfficeInterface> {
    const { _headQuarterId, ...CreateOffice } = createOfficeDto
    //Created Office
    let createdOffice = new this.officeModel(CreateOffice)
    createdOffice = await createdOffice.save()
    //add office to  HeadQuarter
    const updateHeadQuarter = await this.headQuarterService.addOfficeToHeadQuarter(
      _headQuarterId,
      createdOffice.id,
    )
    // Add
    createdOffice = await this.updateHeadQuarterToOffice(
      createdOffice.id,
      _headQuarterId,
    )

    return createdOffice
  }


  async findAll(): Promise<OfficeInterface[]> {
    return this.officeModel.find().exec()
  }

  async findAllQuoter(idOffice: string): Promise<OfficeInterface[]> {
    return this.officeModel.find({"_id": { "$ne": idOffice} }).exec()
  }

  async findAllFill(): Promise<OfficeInterface[]> {
    return this.officeModel
      .find()
      .populate({ path: 'headQuarter', model: 'HeadQuarter' })
      .populate('program', '-__v')
      .populate('insurers', '-__v')
      .exec()
  }

  async findOne(officeSearch: OfficeSearchDto): Promise<OfficeInterface> {
    return this.officeModel.findById({ officeSearch }).exec()
  }

  async findById(officeSearch: string): Promise<OfficeInterface> {
    return this.officeModel.findById(officeSearch, '-_id').exec()
  }

  // Document Crud
  async updateOffice(
    officeId: string,
    updateData: OfficePatchDto,
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
      officeId,
      {
        $set: updateData,
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Office update')
    return office
  }

  /** Constraints begin **/

  async officeCheck(officeId: OfficeFindDto): Promise<boolean> {
    return this.officeModel.exists({ ...officeId })
  }

  async quoteConstraintCheck(
      programId: string,
      programQuoteConstraint: ProgramQuoteConstraintDto
  ): Promise<boolean> {
    Logger.log('id : ', programId)
    return this.officeModel.exists({"_id": programId,
      "quoteConstraint.office": programQuoteConstraint.office,
      "quoteConstraint.quoteConstraint": programQuoteConstraint.quoteConstraint
    })
  }

  async addProgramQuoteConstraintToOffice(
      officeId: string,
      programQuoteDto: OfficeProgramQuoteConstraintDto
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
        officeId,
        {
          $push: {
            programQuoteConstraints: {...programQuoteDto},
          },
        },
        { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Program created')
    return office
  }

  // layer Crud
  async addProgramQuotationToOffice(
      officeId: string,
      programQuoteDto: OfficeProgramQuotationDto
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
        officeId,
        {
          $push: {
            programQuotations: {...programQuoteDto},
          },
        },
        { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Program created')
    return office
  }


  /** Constraints end **/

  // Document Crud
  async deleteOffice(officeId: string): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndDelete(officeId)
    Logger.log('Office delete')
    return office
  }

  // layer Crud
  async updateHeadQuarterToOffice(
    insurerId: string,
    headQuarterId: string,
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
      insurerId,
      {
        $set: {
          headQuarter: headQuarterId,
        },
      },
      { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Program created')
    return office
  }

  // layer Crud
  async addInsurerToOffice(
    _officeId: string,
    _insurerId: string,
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
      _officeId,
      {
        $push: {
          insurers: _insurerId,
        },
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Insurer Added to Office')
    return office
  }

  async deleteInsurerFromOffice(
    _officeId: string,
    _insurerId: string,
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
      _officeId,
      {
        $pull: {
          insurers: _insurerId,
        },
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Program deleted')
    return office
  }

  // layer Crud
  async addProgramToOffice(
    _officeId: string,
    _programId: string,
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
      _officeId,
      {
        $push: {
          program: _programId,
        },
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Insurer Added to Office')
    return office
  }

  async deleteProgramToOffice(
    _officeId: string,
    _programId: string,
  ): Promise<OfficeInterface> {
    const office = this.officeModel.findByIdAndUpdate(
      _officeId,
      {
        $pull: {
          program: _programId,
        },
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Program deleted')
    return office
  }
}
