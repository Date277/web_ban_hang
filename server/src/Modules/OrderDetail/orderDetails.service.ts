import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entity/orderDetails.entity';
import { Order } from '../Order/entity/order.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async getAllOrders(): Promise<any> {
    try {
      const query = await this.orderRepository
        .createQueryBuilder('o')
        .select('o.order_id')
        .addSelect('user_id')
        .addSelect('order_name')
        .addSelect('status')
        .addSelect('email')
        .addSelect('phone')
        .addSelect('address')
        .distinct(true)
        .innerJoin('order_detail', 'od', 'od.order_id = o.order_id')
        .getRawMany();

      return {
        message: 'GET ALL',
        rows: query,
      };
    } catch (error) {
      throw new Error('Unable to fetch data');
    }
  }

  // Add to cart
  async addToCart(
    order_id: number,
    number: number,
    product_id: number,
  ): Promise<any> {
    try {
      const newOrder = {
        order_id,
        number,
        product_id,
      };
      const newOrderDetail = await this.orderDetailRepository.create(
        newOrder as any,
      );
      const savedOrderDetail =
        await this.orderDetailRepository.save(newOrderDetail);
      return {
        message: 'Success add to cart',
        savedOrderDetail,
      };
    } catch (error) {
      throw new Error('Unable to add to cart');
    }
  }

  // Lay theo  id carrt
  async getOrderDetailsByOrderId(orderId: number): Promise<any> {
    try {
      const rows = await this.orderDetailRepository
        .createQueryBuilder('od')
        .select([
          'od.order_detail_id',
          'od.product_id',
          'od.order_id',
          'od.number',
          'o.status',
          'p',
        ])
        .innerJoin('od.product', 'p')
        .innerJoin('od.order', 'o')
        .where('o.order_id = :id', { id: orderId })
        .getMany();

      return {
        message: 'Get one success',
        rows,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
