import { IsNotEmpty } from 'class-validator'

export class CreateInsurerDto {
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
  program?: Array<string>
  // programQuoteConstraints?: Array<{
  //   program: string,
  //   quoteConstraint: string,
  //   previousQuoteConstraint: string
  // }>
  // programQuotations?: Array<{
  //   program: string,
  //   quotation: string,
  //   previousQuotation: string
  // }>
}

export class LoginInsurerDto {
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}

export class InsurerFindDto {
  @IsNotEmpty()
  _id: string
}

export class InsurerSearchDto {
  email: string
  password?: string
  office?: string
  firstName?: string
  lastName?: string
}

export class InsurerProgramDto {
  // @IsNotEmpty()
  insurerId: string
  @IsNotEmpty()
  programId: string
}

export class InsurerPatchDto {
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  office?: string
}

// export class InsurerProgramQuoteDto {
//   programQuote?: Array<{
//     program: string,
//     quoteConstraint: string
//   }>
// }

// export class InsurerProgramQuoteConstraintDto {
//   program: string
//   quoteConstraint: string
//   previousQuoteConstraint: string
// }

// export class InsurerProgramQuotationDto {
//   program: string
//   quotation: string
//   previousQuotation: string
// }
