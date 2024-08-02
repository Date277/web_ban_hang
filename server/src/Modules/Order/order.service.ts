import { UsersService } from './../Users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderDetail } from '../OrderDetail/entity/orderDetails.entity';
import { CreateOrderDto } from './DTO/createOrder.dto';
import { ProductsService } from '../Product/products.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    private usersService: UsersService,
    private productService: ProductsService,
  ) {}

  // get all
  async getAllOrders(): Promise<{ rows: Order[]; length: number }> {
    try {
      const rows = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .innerJoinAndSelect('order.orderDetail', 'orderDetail')
        .innerJoinAndSelect('orderDetail.product', 'product')
        .select([
          'user.users_id',
          'order.order_id',
          'order.order_name',
          'order.status',
          'order.email',
          'order.phone',
          'order.address',
          'orderDetail.number',
          'product.product_id',
          'product.name',
          'product.price',
          'product.sale',
          'product.img',
        ])
        .getMany();
      const length = await this.orderRepository.count();
      return { rows, length };
    } catch (error) {
      console.log(error);

      throw new Error('Unable to fetch all orders');
    }
  }

  // Get history
  async getHistory(id: number): Promise<any> {
    try {
      const rows = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .select([
          'user.users_id',
          'order.order_id',
          'order.order_name',
          'order.status',
          'order.email',
          'order.phone',
          'order.address',
          'order.district',
        ])
        .where('user.users_id = :id', { id })
        .getMany();
      return {
        rows,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Unable to fetch all orders');
    }
  }

  // Phân trang
  async getPaginatedOrders(
    pageIndex: number,
    pageNumber: number,
  ): Promise<{ data: Order[]; length: number }> {
    try {
      const data = await this.orderRepository.find({
        take: pageNumber,
        skip: (pageIndex - 1) * pageNumber,
      });
      const length = await this.orderRepository.count();
      return { data, length };
    } catch (error) {
      throw new Error('Unable to fetch paginated orders');
    }
  }

  // Get order by id
  async getOrderDetailsByOrderId(orderId: number): Promise<any> {
    try {
      const orderDetails = await this.orderDetailRepository
        .createQueryBuilder('orderDetail')
        .innerJoinAndSelect('orderDetail.order', 'order')
        .innerJoinAndSelect('orderDetail.product', 'product')
        .select([
          'orderDetail.number',
          'order.order_id',
          'order.order_name',
          'order.email',
          'order.phone',
          'order.address',
          'order.province',
          'order.district',
          'order.ward',
          'product.product_id',
          'product.number',
          'product.name',
          'product.price',
          'product.sale',
          'product.price',
          'product.sale',
        ])

        .where('orderDetail.order_id = :id', { id: orderId })
        .getMany();

      return orderDetails;
    } catch (error) {
      console.log(error);

      throw new Error('Error fetching order details');
    }
  }

  // Create order
  async createOrder(data: CreateOrderDto): Promise<any> {
    const {
      user_id,
      order_name,
      email,
      phone,
      address,
      province,
      district,
      ward,
      cart,
    } = data;

    try {
      const getUserId = await this.usersService.findOneById(Number(user_id));
      if (!getUserId) {
        throw new Error('Người dùng không tồn tại'); // Xử lý khi không tìm thấy người dùng
      }

      const newUsser = {
        user: getUserId,
        order_name: order_name,
        created_at: new Date(),
        status: 'Chờ xác nhận',
        email,
        phone,
        address,
        province,
        district,
        ward,
      };
      const newOrder = await this.orderRepository.create(newUsser as any);
      const savedOrder = await this.orderRepository.save(newOrder as any);
      console.log(savedOrder);

      const orderDetailsToInsert = cart.map((item: any) => ({
        order_id: savedOrder.order_id,
        number: item.clickNumber,
        product: Number(item.product_id),
      }));

      // console.log(orderDetailsToInsert);

      const newOrderDetail = await this.orderDetailRepository.create(
        orderDetailsToInsert as any,
      );
      const savedOrderDetail = await this.orderDetailRepository.save(
        newOrderDetail as any,
      );

      return {
        message: 'Đặt hàng thành công',
        savedOrder: savedOrder,
      };
    } catch (error) {
      console.log('err', error);
      throw new Error('Lỗi khi đặt hàng');
    }
  }

  // Update order
  async updateOrderStatus(orderId: number, status: string): Promise<string> {
    try {
      await this.orderRepository
        .createQueryBuilder()
        .update(Order)
        .set({ status: status })
        .where('order_id = :id', { id: orderId })
        .execute();

      return 'Update product success';
    } catch (error) {
      throw new Error('Update not success');
    }
  }

  // Delete order
  async deleteOrder(orderId: number): Promise<any> {
    try {
      const result = await this.orderRepository.delete(orderId);
      const data = await this.orderRepository.find();
      const count = await this.orderRepository.count();

      return {
        message: 'Đã delete order thành công',
        rows: data,
        length: count,
      };
    } catch (error) {
      throw new Error('Delete not success');
    }
  }
}
