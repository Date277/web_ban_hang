import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/createUser.dto';
import { User } from './entity/users.entity';
import { UpdateUserDto } from './DTO/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // Lấy toàn bộ user
  async findAll(): Promise<any> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Phân trang
  async pagination(pageIndex: number, pageNumber: number) {
    try {
      if (!pageIndex || !pageNumber) {
        return null;
      }

      const users = await this.usersRepository
        .createQueryBuilder('user')
        .select()
        .skip((pageIndex - 1) * pageNumber)
        .take(pageNumber)
        .getMany();

      const count = await this.usersRepository.createQueryBuilder().getCount();

      return {
        message: 'GET ALL',
        data: users,
        length: count,
      };
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Lấy 1 user
  async findOneById(id: number): Promise<any> {
    try {
      return await this.usersRepository.findOne({ where: { users_id: id } });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Lấy user theo email
  async findOneByEmail(email: string): Promise<any> {
    try {
      return await this.usersRepository.findOne({ where: { email: email } });
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // Tạo 1 user
  async create(user: CreateUserDto): Promise<any> {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  // // Sửa thông tin user
  async update(users_id: number, status: string) {
    try {
      const user = await this.usersRepository.find({
        where: { users_id: users_id },
      });
      if (!user) {
        return {
          message: `User with id = ${users_id} does not exist`,
        };
      }
      user[0].status = status;
      await this.usersRepository.save(user);
      return {
        user,
        message: 'Update user success',
      };
    } catch (error) {
      throw error;
    }
  }
}
