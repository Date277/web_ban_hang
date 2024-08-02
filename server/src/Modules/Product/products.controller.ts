import { ProductsService } from './products.service';
import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    try {
      const products = await this.ProductsService.getAllProducts();
      return { message: 'GET ALL', rows: products };
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // filter by category
  // @Get('/category')
  // async filterByCategory(
  //   @Query('category') category: string,
  //   @Query('page_index') pageIndex: number,
  //   @Query('page_number') pageNumber: number,
  // ) {
  //   return this.ProductsService.filterByCategory(
  //     category,
  //     pageIndex,
  //     pageNumber,
  //   );
  // }

  // Tìm kiếm sản phẩm theo tên
  @Get('/search')
  async searchByName(@Query('name') name: string) {
    try {
      const products = await this.ProductsService.searchByName(name);
      return { message: 'GET products by name', rows: products };
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // Phân trang
  @Get('/pagination')
  async getPaginatedProducts(
    @Query('page_index') pageIndex: number,
    @Query('page_number') pageNumber: number,
  ) {
    try {
      console.log(pageIndex);
      console.log(pageNumber);
      const parsedPageIndex = Number(pageIndex);
      const parsedPageNumber = Number(pageNumber);
      const result = await this.ProductsService.getPaginatedProducts(
        parsedPageIndex,
        parsedPageNumber,
      );
      return { message: 'GET ALL', data: result.data, length: result.length };
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const productId = parseInt(id, 10);
      const product = await this.ProductsService.getProductById(productId);
      if (!product) {
        return { message: 'Product not found' };
      }
      return product;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // Create product
  // @Post()
  // async createProduct(
  //   @Body() productData: any,
  //   @Query('categoryId') categoryId: number,
  // ): Promise<any> {
  //   return this.ProductsService.createProduct(productData, categoryId);
  // }

  // // Update product
  // @Put(':id')
  // async updateProduct(
  //   @Param('id') productId: number,
  //   @Query('categoryId') categoryId: number,
  //   @Body() updateProductData: any,
  // ): Promise<any> {
  //   console.log({
  //     productId,
  //     categoryId,
  //     updateProductData,
  //   });

  //   return this.ProductsService.updateProduct(
  //     productId,
  //     categoryId,
  //     updateProductData,
  //   );
  // }

  // Delete product
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const productId = parseInt(id, 10);
      const result = await this.ProductsService.deleteProduct(productId);
      return { message: result };
    } catch (error) {
      return { message: 'Delete not successful' };
    }
  }
}
