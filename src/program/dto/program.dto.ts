import {IsNotEmpty} from 'class-validator'
import {BaseStructureTypeEnum, StatusStructureTypeEnum} from '../../constant/ObjectSchema'
import {CreateLayerDto, LayerUpdateDto} from '../../layer/dto/create-layer.dto'
import {ConstraintUpdateDto, CreateConstraintDto} from '../../constraint/dto/create-constraint.dto'
import {CreateQuoteConstraintDto} from '../../quoteConstraint/dto/create-quote-constraint.dto'

export class CreateProgramDto {
    @IsNotEmpty()
    title: string
    // insurer: string
    @IsNotEmpty()
    office: string
    @IsNotEmpty()
    type: string
    @IsNotEmpty()
    lineOfBusiness: string
    @IsNotEmpty()
    riskStructure: string
    @IsNotEmpty()
    limit: number
    @IsNotEmpty()
    premiumIncome: number
    structure: string
    layers: Array<CreateLayerDto>
    constraints: Array<CreateConstraintDto>
    dateCreation: Date
    base: string = BaseStructureTypeEnum.LOSS_EVENT
    status: string = StatusStructureTypeEnum.UN_COMPLETE
    communicationPeriod: {
        communicationStart: Date
        communicationEnd: Date
    }
    quotationPeriod: {
        quotationStart: Date
        quotationEnd: Date
    }
    quoterList?: {
        quoter: Array<string>
        follower: Array<string>
    }
    quoteConstraint?: Array<{
        insurer: string,
        quoteConstraint: string,
        previousQuoteConstraint?: string
    }>
    quotation?: Array<{
        insurer: string,
        quotation: string,
        previousQuotation?: string
    }>


    constructor() {
        this.status = StatusStructureTypeEnum.UN_COMPLETE
    }

    //create() {
    //    this.status = StatusStructureTypeEnum.UN_COMPLETE
    //    this.dateCreation = new Date()
    //    this.communication = {
    //        communicationStart: new Date(),
    //        communicationEnd: new Date()
    //    };
    //    this.quotation = {
    //        quotationStart: new Date() ,
    //        quotationEnd: new Date()
    //    };
    //}
}

export class CreateProgram {
    @IsNotEmpty()
    title: string
    // @IsNotEmpty()
    // insurer: string
    @IsNotEmpty()
    office: string
    @IsNotEmpty()
    type: string
    @IsNotEmpty()
    lineOfBusiness: string
    @IsNotEmpty()
    riskStructure: string
    structure: string
    base: string
    status: string
    dateCreation: Date
    document: Array<string>
    layer: Array<string>
    Limit: number
    premiumIncome: number
    communicationPeriod: {
        communicationStart: Date
        communicationEnd: Date
    }
    quotationPeriod: {
        quotationStart: Date
        quotationEnd: Date
    }
    quoterList?: {
        quoter: Array<string>
        follower: Array<string>
    }
    quoteConstraint?: Array<{
        insurer: string,
        quoteConstraint: string,
        previousQuoteConstraint: string
    }>
    quotation?: Array<{
        insurer: string,
        quotation: string,
        previousQuotation: string
    }>

}

export class TargetCrudDto {
    _id: string
}

export class TargetSetCrudDto {
    @IsNotEmpty()
    _id: string
    _idOld?: string
}

export class PeriodDto {
    start: string
    end: string
}

export class PeriodSetCrudDto {
    period: {
        start: string
        end: string
    }
    target: programPeriodDto
}

export class QuoterListSetCrudDto {
    // quoterList: {
    quoter: Array<string>
    follower: Array<string>
    // }
    // target: programPeriodDto
}

export class ProgramPatchDto {
    @IsNotEmpty()
    title: string
    // @IsNotEmpty()
    // insurer: string
    @IsNotEmpty()
    office: string
    @IsNotEmpty()
    type: string
    @IsNotEmpty()
    lineOfBusiness: string
    @IsNotEmpty()
    riskStructure: string
    structure: string
    base: string
    status: string
    dateCreation: Date
}

export class ProgramPatchLayerDto {
    @IsNotEmpty()
    _id: string
    @IsNotEmpty()
    layers: Array<LayerUpdateDto>
}

export class ProgramPatchConstraintDto {
    @IsNotEmpty()
    constraints: Array<ConstraintUpdateDto>
}

export const enum programDto {
    DOCUMENT = 'document',
    LAYER = 'layer',
    CONSTRAINT = 'constraint',
    INSURER = 'insurer',
    QUOTATION = 'quotation',
    QUOTER_LIST = 'quoterList',
    COMMUNICATION = 'communication',
}

export const enum programPeriodDto {
    QUOTATION = 'quotation',
    COMMUNICATION = 'communication',
}

export class ProgramQuoteConstraintDto {
    // insurer: string
    office: string
    quoteConstraint: string
    previousQuoteConstraint?: string
}

export class ProgramQuotationDto {
    // insurer: string
    office: string
    quotation: string
    previousQuotation?: string
}

export class QuoteConstraintDto {
    // insurerId: string
    officeId: string
    quoteConstraint: CreateQuoteConstraintDto
}

export class QuoteConstraintSearchDto {
    programId?: string
    officeId?: string
    // insurerId?: string
}