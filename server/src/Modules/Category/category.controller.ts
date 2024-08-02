import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './DTO/createCategory.dto';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  async getAllProduct(): Promise<any> {
    return await this.CategoryService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.CategoryService.findOne(Number(id));
  }

  @Post('/')
  async createCategory(@Body() categoryData: CreateCategoryDto): Promise<any> {
    return await this.CategoryService.createCategory(categoryData);
  }
}
