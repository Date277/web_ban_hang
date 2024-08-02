import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Get('')
  async getAllOrders() {
    try {
      const result = await this.OrderService.getAllOrders();
      return {
        message: 'GET ALL',
        rows: result.rows,
        length: result.length,
      };
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // Phân trang
  @Get('/pagination')
  async getPaginatedOrders(
    @Query('page_index') pageIndex: number,
    @Query('page_number') pageNumber: number,
  ) {
    try {
      const parsedPageIndex = Number(pageIndex);
      const parsedPageNumber = Number(pageNumber);
      const result = await this.OrderService.getPaginatedOrders(
        parsedPageIndex,
        parsedPageNumber,
      );
      return {
        message: 'GET ALL',
        data: result.data,
        length: result.length,
      };
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // Lấy 1 id
  @Get('/:id')
  async getOrderDetailsByOrderId(@Param('id') id: number): Promise<any> {
    const orderId = Number(id);
    try {
      const orderDetails =
        await this.OrderService.getOrderDetailsByOrderId(orderId);
      return {
        rowOrders: orderDetails,
        message: 'GET ALL ORDERS',
      };
    } catch (error) {
      return {
        error: 'Error fetching order details',
      };
    }
  }

  // Tạo 1 order
  @Post()
  async createOrder(@Body() orderData: any): Promise<any> {
    return this.OrderService.createOrder(orderData);
  }

  // Update 1 order
  @Put(':id')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const orderId = parseInt(id, 10);

    try {
      const message = await this.OrderService.updateOrderStatus(
        orderId,
        status,
      );
      return { message };
    } catch (error) {
      return { message: error.message };
    }
  }

  // Delete 1 order
  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    const orderId = parseInt(id, 10);
    try {
      const result = await this.OrderService.deleteOrder(orderId);
      return result;
    } catch (error) {
      return { message: error.message };
    }
  }

  // Get history
  @Get('/history/:id')
  async getHistory(@Param('id') id: number): Promise<any> {
    return await this.OrderService.getHistory(Number(id));
  }
}
