import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../Users/users.service';
import { LoginUserDto } from './DTO/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './DTO/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(newUser: RegisterUserDto): Promise<any> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    try {
      const user = await this.usersService.create({
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
      });
      return {
        message: 'Register successfully',
        data: user,
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async login(user: LoginUserDto): Promise<any> {
    try {
      let findUser = await this.usersService.findOneByEmail(user.email);
      const conparePassword = await bcrypt.compare(
        user.password,
        findUser.password,
      );
      if (!findUser || !conparePassword) {
        throw new HttpException(
          'Email hoặc mật khẩu khác',
          HttpStatus.BAD_REQUEST,
        );
      }
      const token = await this.generateJwtToken(findUser.id, findUser.email);
        const { password, ...result } = findUser;        
      return {
        status: 200,
        rows: result,
        info: {
          name: findUser.name,
          users_id: findUser.users_id,
          role: findUser.role,
        },
      };
    } catch (error) {}
  }

  async generateJwtToken(id: number, email: string) {
    return await this.jwtService.sign({
      id: id,
      email: email,
    });
  }
}
