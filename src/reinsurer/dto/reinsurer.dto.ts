import { IsNotEmpty } from 'class-validator'

export class CreateReinsurerDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  firstName: string
  @IsNotEmpty()
  lastName: string
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
  @IsNotEmpty()
  office: string
  // program?: Array<string>
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

export class LoginReinsurerDto {
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}

export class ReinsurerFindDto {
  @IsNotEmpty()
  _id: string
}

export class ReinsurerSearchDto {
  email: string
  password?: string
  office?: string
  firstName?: string
  lastName?: string
}

export class ReinsurerProgramQuoteConstraintDto {
  program: string
  quoteConstraint: string
  previousQuoteConstraint: string
}

export class ReinsurerProgramQuotationDto {
  program: string
  quotation: string
  previousQuotation: string
}

export class ReinsurerPatchDto {
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  office?: string
}
