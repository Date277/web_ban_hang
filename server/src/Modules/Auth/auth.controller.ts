import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './DTO/registerUser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginUserDto } from './DTO/loginUser.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  register(@Body() user: RegisterUserDto) {
    if (user.password !== user.password) {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }
    return this.authService.register(user);
  }

  @Post('/signin')
  login(@Body() user: LoginUserDto) {
    console.log(user);
    
    return this.authService.login(user);
  }
}
