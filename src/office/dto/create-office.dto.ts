import { AddressDto } from '../../constant/ObjectSchema'
import { IsNotEmpty } from 'class-validator'

export class CreateOfficeDto {
  @IsNotEmpty()
  name: string
  address: typeof AddressDto // TODO :  refactor and change
  headQuarter: string
  insurers: Array<string>
  program: Array<string>
  @IsNotEmpty()
  _headQuarterId: string
  programQuoteConstraints?: Array<{
    program: string,
    quoteConstraint: string,
    previousQuoteConstraint: string
  }>
  programQuotations?: Array<{
    program: string,
    quotation: string,
    previousQuotation: string
  }>
}

export class OfficeSearchDto {
  name: string
}

export class OfficeProgramQuoteConstraintDto {
  program: string
  quoteConstraint: string
  previousQuoteConstraint: string
}

export class OfficeProgramQuotationDto {
  program: string
  quotation: string
  previousQuotation: string
}

export class OfficeProgramDto {
  @IsNotEmpty()
  officeId: string
  @IsNotEmpty()
  programId: string
}

export class OfficeInsurerDto {
  //@IsNotEmpty()
  //officeId: string;
  @IsNotEmpty()
  _id: string
}

export class OfficeFindDto {
  @IsNotEmpty()
  _id: string
}

export class OfficeAddressPatchDto {
  address: typeof AddressDto
}

export class OfficePatchDto {
  name?: string
  headQuarter?: string
}
