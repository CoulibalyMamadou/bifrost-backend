import { Inject, Injectable, Logger } from '@nestjs/common'
import { INSURER_MODEL } from '../constant/constant'
import { InsurerInterface } from './interface/insurer.interface'
import { Model } from 'mongoose'
import {
  CreateInsurerDto,
  InsurerFindDto,
  InsurerPatchDto,
  InsurerSearchDto,
  LoginInsurerDto
} from './dto/insurer.dto'
import { OfficeService } from '../office/office.service'

@Injectable()
export class InsurerService {
  constructor(
    @Inject(INSURER_MODEL)
    private insurerModel: Model<InsurerInterface>,
    private officeService: OfficeService,
  ) {}

  async insurerCheck(insurerId: InsurerFindDto): Promise<boolean> {
    return this.insurerModel.exists({ ...insurerId })
  }

  async create(
    createInsurerDto: CreateInsurerDto,
  ): Promise<InsurerInterface | string> {
    if (
      await this.officeService.officeCheck({ _id: createInsurerDto.office })
    ) {
      const createdInsurer = new this.insurerModel(createInsurerDto)
      const office = await this.officeService.addInsurerToOffice(
        createdInsurer.office,
        createdInsurer.id,
      )
      Logger.log('User created', createdInsurer.id)
      Logger.log('User added at office : ', office.name)
      return createdInsurer.save()
    }

    Logger.log(
      "Can't created program because  office unkown : ",
      createInsurerDto.office,
    )
    return 'Can\'t created program because  insurer unknown '
  }

  async findByCredential(
    loginInsurer: LoginInsurerDto,
  ): Promise<InsurerInterface> {
    const insurer = await this.insurerModel.findOne({ ...loginInsurer }).exec()
    return insurer ? insurer : null
  }

  async findById(_id: string): Promise<InsurerInterface> {
    const insurer = await this.insurerModel.findById(_id).exec()
    return insurer ? insurer : null
  }

  async findInformationById(_id: string): Promise<InsurerInterface> {
    const insurer = await this.insurerModel.findById(_id, 'firstName lastName office -_id').exec()
    return insurer ? insurer : null
  }

  async findOneByEmail(insurerSearch: InsurerSearchDto): Promise<InsurerInterface> {
    return this.insurerModel.findOne({email: insurerSearch.email})
  }

  async findOne(insurerSearch: InsurerSearchDto): Promise<InsurerInterface> {
    return this.insurerModel.findById({ insurerSearch }).exec()
  }

  async findAll(): Promise<InsurerInterface[]> {
    return this.insurerModel.find().exec()
  }

  async findByIdAndFill(insurerId: string): Promise<InsurerInterface> {
    return this.insurerModel
      .findById(insurerId)
      .populate({
        path: 'office',
        model: 'Office'
      }, 'name')
      .populate({
        path: 'office.headQuarter',
        model: 'HeadQuarter'
      }, 'name')
      .populate({ path: 'office', model: 'Office'})
      .exec()
  }

  async findAllFill(): Promise<InsurerInterface[]> {
    return this.insurerModel
      .find()
      .populate({
        path: 'program',
        model: 'Program'
      })
      .populate({ path: 'office', model: 'Office'})
      .exec()
  }

  // Document Crud
  async updateInsurer(
    insurerId: string,
    updateData: InsurerPatchDto,
  ): Promise<InsurerInterface> {
    const insurer = this.insurerModel.findByIdAndUpdate(
      insurerId,
      {
        $set: updateData,
        // {
        //     field: updateData
        // }
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Insurer update')
    return insurer
  }

  // layer Crud
  async addProgramToInsurer(
      insurerId: string,
      programId: string,
  ): Promise<InsurerInterface> {
    const insurer = this.insurerModel.findByIdAndUpdate(
        insurerId,
        {
          $push: {
            program: programId,
          },
        },
        { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Program created')
    return insurer
  }

  async deleteProgramToInsurer(
      insurerId: string,
      programId: string,
  ): Promise<InsurerInterface> {
    const insurer = this.insurerModel.findByIdAndUpdate(
        insurerId,
        {
          $pull: {
            program: programId,
          },
        },
        { new: true, useFindAndModify: false },
    )
    Logger.log('Program deleted')
    return insurer
  }

  // Document Crud
  async deleteInsurer(_id: string): Promise<InsurerInterface> {
    const insurer = this.insurerModel.findByIdAndDelete(
        _id,
        // {new: true, useFindAndModify: false}
    )
    Logger.log('Insurer delete')
    return insurer
  }

  // async quoteConstraintCheck(
  //     programId: string,
  //     programQuoteConstraint: ProgramQuoteConstraintDto
  // ): Promise<boolean> {
  //   Logger.log('id : ', programId)
  //   return this.insurerModel.exists({"_id": programId,
  //     "quoteConstraint.insurer": programQuoteConstraint.insurer,
  //     "quoteConstraint.quoteConstraint": programQuoteConstraint.quoteConstraint
  //   })
  // }
//
  // async quotationCheck(
  //     programId: string,
  //     programQuotation: ProgramQuotationDto
  // ): Promise<boolean> {
  //   Logger.log('id : ', programId)
  //   return this.insurerModel.exists({"_id": programId,
  //     "quotation.insurer": programQuotation.insurer,
  //     "quotation.quotation": programQuotation.quotation
  //   })
  // }

  // layer Crud
  // async addProgramQuoteConstraintToInsurer(
  //   insurerId: string,
  //   programQuoteDto: InsurerProgramQuoteConstraintDto
  // ): Promise<InsurerInterface> {
  //   const insurer = this.insurerModel.findByIdAndUpdate(
  //     insurerId,
  //     {
  //       $push: {
  //         programQuoteConstraints: {...programQuoteDto},
  //       },
  //     },
  //     { new: true, useFindAndModify: false },
  //   )
  //   // const data = createdDocument.save();
  //   Logger.log('Program created')
  //   return insurer
  // }
//
  // // layer Crud
  // async addProgramQuotationToInsurer(
  //   insurerId: string,
  //   programQuoteDto: InsurerProgramQuotationDto
  // ): Promise<InsurerInterface> {
  //   const insurer = this.insurerModel.findByIdAndUpdate(
  //     insurerId,
  //     {
  //       $push: {
  //         programQuotations: {...programQuoteDto},
  //       },
  //     },
  //     { new: true, useFindAndModify: false },
  //   )
  //   // const data = createdDocument.save();
  //   Logger.log('Program created')
  //   return insurer
  // }
}
