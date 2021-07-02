import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
  @IsNotEmpty()
  organization: string
  @IsNotEmpty()
  firstName: string
  @IsNotEmpty()
  lastName: string
}

export class LoginUserDto {
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
}
