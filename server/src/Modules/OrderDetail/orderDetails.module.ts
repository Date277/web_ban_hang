import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entity/orderDetails.entity';
import { OrderDetailController } from './orderDetails.controller';
import { OrderDetailService } from './orderDetails.service';
import { Order } from '../Order/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, Order])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  exports: [],
})
export class OrderDetailsModule {}
