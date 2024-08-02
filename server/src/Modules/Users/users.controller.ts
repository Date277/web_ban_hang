import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/createUser.dto';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // Lấy toàn bộ user
  async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }

  // Phân trang
  @Get('/pagination')
  async getUsers(
    @Query('page_index') pageIndex: number,
    @Query('page_number') pageNumber: number,
  ) {
    return await this.usersService.pagination(pageIndex, pageNumber);
  }

  // Lay 1 user
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.usersService.findOneById(Number(id));
  }

  // Tìm theo email
  @Get('/email/:email')
  async findOneByEmail(email: string): Promise<any> {
    return await this.usersService.findOneByEmail(email);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') users_id: number,
    @Body('status') status: string,
  ) {
    return await this.usersService.update(users_id, status);
  }
}
