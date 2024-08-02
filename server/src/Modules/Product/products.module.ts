import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoryModule } from '../Category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]) , CategoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
