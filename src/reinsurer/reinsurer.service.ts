import { Inject, Injectable, Logger } from '@nestjs/common'
import { REINSURER_MODEL } from '../constant/constant'
import { ReinsurerInterface } from './interface/reinsurer.interface'
import { Model } from 'mongoose'
import {
  CreateReinsurerDto,
  ReinsurerFindDto,
  ReinsurerPatchDto, ReinsurerProgramQuotationDto, ReinsurerProgramQuoteConstraintDto,
  ReinsurerSearchDto,
  LoginReinsurerDto
} from './dto/reinsurer.dto'
import { OfficeService } from '../office/office.service'
import {ProgramQuotationDto, ProgramQuoteConstraintDto} from '../program/dto/program.dto'
import {InsurerInterface} from '../insurer/interface/insurer.interface'

@Injectable()
export class ReinsurerService {
  constructor(
    @Inject(REINSURER_MODEL)
    private reinsurerModel: Model<ReinsurerInterface>,
    private officeService: OfficeService,
  ) {}

  async reinsurerCheck(reinsurerId: ReinsurerFindDto): Promise<boolean> {
    return this.reinsurerModel.exists({ ...reinsurerId })
  }

  async findInformationById(_id: string): Promise<ReinsurerInterface> {
    const reinsurer = await this.reinsurerModel.findById(_id, 'firstName lastName office -_id').exec()
    return reinsurer ? reinsurer : null
  }

  async create(
    createReinsurerDto: CreateReinsurerDto,
  ): Promise<ReinsurerInterface | string> {
    if (
      await this.officeService.officeCheck({ _id: createReinsurerDto.office })
    ) {
      const createdReinsurer = new this.reinsurerModel(createReinsurerDto)
      const office = await this.officeService.addInsurerToOffice(
        createdReinsurer.office,
        createdReinsurer.id,
      )
      Logger.log('Reinsurer created', createdReinsurer.id)
      Logger.log('Reinsurer added at office : ', office.name)
      return createdReinsurer.save()
    }

    Logger.log(
      "Can't created Office because office unknown : ",
      createReinsurerDto.office,
    )
    return 'Can\'t created Office because reinsurer unknown '
  }

  async findByCredential(
    loginReinsurer: LoginReinsurerDto,
  ): Promise<ReinsurerInterface> {
    const reinsurer = await this.reinsurerModel.findOne({ ...loginReinsurer }).exec()
    return reinsurer ? reinsurer : null
  }

  async findById(_id: string): Promise<ReinsurerInterface> {
    const reinsurer = await this.reinsurerModel.findById(_id).exec()
    return reinsurer ? reinsurer : null
  }

  async findByIdAndFill(insurerId: string): Promise<ReinsurerInterface> {
    const reinsurer = await this.reinsurerModel
        .findById(insurerId, '-_id')
        .populate({
          path: 'office',
          model: 'Office'
        }, '-_id name')
        // .populate({
        //   path: 'office.headQuarter',
        //   model: 'HeadQuarter'
        // }, 'name')
        // .populate({ path: 'office', model: 'Office'})
        .exec()
    return reinsurer ? reinsurer : null
  }
  async findOneByEmail(reinsurerSearch: ReinsurerSearchDto): Promise<ReinsurerInterface> {
    return this.reinsurerModel.findOne({email: reinsurerSearch.email})
  }

  async findOne(reinsurerSearch: ReinsurerSearchDto): Promise<ReinsurerInterface> {
    return this.reinsurerModel.findById({ reinsurerSearch }).exec()
  }

  async findAll(): Promise<ReinsurerInterface[]> {
    return this.reinsurerModel.find().exec()
  }

  async findAllFill(): Promise<ReinsurerInterface[]> {
    return this.reinsurerModel
      .find()
      .populate({
        path: 'program',
        model: 'Program'
      })
      .populate({ path: 'office', model: 'Office'})
      .exec()
  }

  // Document Crud
  // async updateReinsurer(reinsurerId: string, field: string, updateData: ReinsurerPatchDto): Promise<AuthanticateInterface> {
  async updateReinsurer(
    reinsurerId: string,
    updateData: ReinsurerPatchDto,
  ): Promise<ReinsurerInterface> {
    const reinsurer = this.reinsurerModel.findByIdAndUpdate(
      reinsurerId,
      {
        $set: updateData,
        // {
        //     field: updateData
        // }
      },
      { new: true, useFindAndModify: false },
    )
    Logger.log('Reinsurer update')
    return reinsurer
  }

  // async quoteConstraintCheck(
  //     programId: string,
  //     programQuoteConstraint: ProgramQuoteConstraintDto
  // ): Promise<boolean> {
  //   Logger.log('id : ', programId)
  //   return this.reinsurerModel.exists({"_id": programId,
  //     "quoteConstraint.insurer": programQuoteConstraint.insurer,
  //     "quoteConstraint.quoteConstraint": programQuoteConstraint.quoteConstraint
  //   })
  // }

  // async quotationCheck(
  //     programId: string,
  //     programQuotation: ProgramQuotationDto
  // ): Promise<boolean> {
  //   Logger.log('id : ', programId)
  //   return this.reinsurerModel.exists({"_id": programId,
  //     "quotation.insurer": programQuotation.insurer,
  //     "quotation.quotation": programQuotation.quotation
  //   })
  // }


  // layer Crud
  // async addProgramToReinsurer(
  //   reinsurerId: string,
  //   programId: string,
  // ): Promise<AuthanticateInterface> {
  //   const reinsurer = this.reinsurerModel.findByIdAndUpdate(
  //     reinsurerId,
  //     {
  //       $push: {
  //         program: programId,
  //       },
  //     },
  //     { new: true, useFindAndModify: false },
  //   )
  //   // const data = createdDocument.save();
  //   Logger.log('Program created')
  //   return reinsurer
  // }

  // layer Crud
  async addProgramQuoteConstraintToReinsurer(
    reinsurerId: string,
    programQuoteDto: ReinsurerProgramQuoteConstraintDto
  ): Promise<ReinsurerInterface> {
    const reinsurer = this.reinsurerModel.findByIdAndUpdate(
      reinsurerId,
      {
        $push: {
          programQuoteConstraints: {...programQuoteDto},
        },
      },
      { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Program created')
    return reinsurer
  }

  // layer Crud
  async addProgramQuotationToReinsurer(
    reinsurerId: string,
    programQuoteDto: ReinsurerProgramQuotationDto
  ): Promise<ReinsurerInterface> {
    const reinsurer = this.reinsurerModel.findByIdAndUpdate(
      reinsurerId,
      {
        $push: {
          programQuotations: {...programQuoteDto},
        },
      },
      { new: true, useFindAndModify: false },
    )
    // const data = createdDocument.save();
    Logger.log('Program created')
    return reinsurer
  }

  // async deleteProgramToReinsurer(
  //   reinsurerId: string,
  //   programId: string,
  // ): Promise<AuthanticateInterface> {
  //   const reinsurer = this.reinsurerModel.findByIdAndUpdate(
  //     reinsurerId,
  //     {
  //       $pull: {
  //         program: programId,
  //       },
  //     },
  //     { new: true, useFindAndModify: false },
  //   )
  //   Logger.log('Program deleted')
  //   return reinsurer
  // }

  // Document Crud
  async deleteReinsurer(_id: string): Promise<ReinsurerInterface> {
    const reinsurer = this.reinsurerModel.findByIdAndDelete(
      _id,
      // {new: true, useFindAndModify: false}
    )
    Logger.log('Reinsurer delete')
    return reinsurer
  }
}
