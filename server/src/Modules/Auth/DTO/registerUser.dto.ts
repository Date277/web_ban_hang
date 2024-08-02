import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
} from 'class-validator';
import { IsGmailEmail } from '../../../decorators/email.decorator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsGmailEmail({
    message: 'Email k hợp lệ',
  })
  email: string;

  @MaxLength(255)
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
