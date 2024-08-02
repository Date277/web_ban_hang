import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDetail } from '../OrderDetail/entity/orderDetails.entity';
import { UsersModule } from '../Users/users.module';
import { ProductsModule } from '../Product/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
