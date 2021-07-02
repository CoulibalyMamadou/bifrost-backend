import { AddressDto } from '../../constant/ObjectSchema'
import { IsNotEmpty } from 'class-validator'

export class CreateHeadQuarterDto {
  name: string
  description: string
  address: typeof AddressDto
  creditRating: string
  office: Array<string>
}

export class HeadQuarterSearchDto {
  name?: string
  description?: string
  address?: typeof AddressDto
  creditRating?: string
  office?: string
}

export class HeadQuarterFindDto {
  @IsNotEmpty()
  _id: string
}

export class HeadQuarterDto {
  @IsNotEmpty()
  id: string
}

export class HeadQuarterPatchDto {
  name?: string
  // address?: string;
  headQuarter?: string
}

export class HeadQuarterCrudOfficeDto {
  @IsNotEmpty()
  id: string
}
