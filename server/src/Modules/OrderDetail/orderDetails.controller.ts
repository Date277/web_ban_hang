import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderDetailService } from './orderDetails.service';

@Controller('/api/v1/order-details')
export class OrderDetailController {
  constructor(private readonly OrderDetailService: OrderDetailService) {}

  // get all
  @Get()
  async getAllOrders() {
    try {
      const result = await this.OrderDetailService.getAllOrders();
      return result;
    } catch (error) {
      return { message: error.message };
    }
  }

  // Lay theo  id carrt
  @Get('/:id')
  async getOrderDetailsByOrderId(@Param('id') id: string) {
    try {
      const result = await this.OrderDetailService.getOrderDetailsByOrderId(
        Number(id),
      );
      return result;
    } catch (error) {
      return { message: error.message };
    }
  }

  // Add to cart
  @Post('/add-to-cart')
  async addToCart(@Body() body: any) {
    try {
      const { order_id, number, product_id } = body;
      const result = await this.OrderDetailService.addToCart(
        order_id,
        number,
        product_id,
      );
      return result;
    } catch (error) {
      return { message: error.message };
    }
  }
}
