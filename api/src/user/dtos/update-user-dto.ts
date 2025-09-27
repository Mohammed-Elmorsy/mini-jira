import { IsOptional, IsStrongPassword, IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    },
  )
  password?: string
}
