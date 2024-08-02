import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
