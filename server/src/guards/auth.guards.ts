import { UsersService } from './../Modules/Users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  token: string;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private UsersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      // request.headers.authorization ||
      request.headers.authorization?.startsWith('Bearer')
    ) {
      this.token = request.headers.authorization.split(' ')[1];
    }

    if (!this.token || this.token === '') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const decode = await this.jwtService.verifyAsync(this.token, {
      secret: this.configService.get('JWT_SECRET'),
    });

    if (!decode) {
      throw new HttpException('Bạn chưa login', HttpStatus.UNAUTHORIZED);
    }

    // Kiểm tra db có tồn tại hay k
    const userCurrent = await this.UsersService.findOneByEmail(decode.email);
    if (!userCurrent) {
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }
    request['user'] = userCurrent;

    return true;
  }
}
