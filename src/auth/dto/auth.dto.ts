import { IsNotEmpty } from 'class-validator'
import {CreateInsurerDto} from '../../insurer/dto/insurer.dto'
import {CreateReinsurerDto} from '../../reinsurer/dto/reinsurer.dto'

export class CreateAuthDto {
  @IsNotEmpty()
  userId: string
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  password: string
  @IsNotEmpty()
  userType: string
}

export class AuthSearchDto {
  @IsNotEmpty()
  _id: string
}

export class CreateUserDto {
  @IsNotEmpty()
  userType: string
  @IsNotEmpty()
  user: CreateInsurerDto | CreateReinsurerDto
}

export class LoginAuthDto {
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}

export class AuthFindDto {
  @IsNotEmpty()
  userId: string
  email?: string
  password?: string
}

export class AuthPatchDto {
  username?: string
  email?: string
  password?: string
}
