import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto } from './DTO/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryReponsitory: Repository<Category>,
  ) {}

  async findAll(): Promise<any> {
    return await this.categoryReponsitory.find();
  }

  async findOne(id: number): Promise<any> {
    return await this.categoryReponsitory.findOne({
      where: { category_id: id },
    });
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<any> {
    return await this.categoryReponsitory.save(categoryData);
  }
}
