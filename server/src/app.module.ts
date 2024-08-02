import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './Modules/Auth/auth.module';
import { UsersModule } from './Modules/users/users.module';
import { OrderModule } from './Modules/Order/order.module';
import { ProductsModule } from './Modules/Product/products.module';
import { OrderDetailsModule } from './Modules/OrderDetail/orderDetails.module';

import { User } from './Modules/Users/entity/users.entity';
import { Order } from './Modules/Order/entity/order.entity';
import { OrderDetail } from './Modules/OrderDetail/entity/orderDetails.entity';
import { Product } from './Modules/Product/entity/products.entity';
import { Category } from './Modules/Category/entity/category.entity';
import { CategoryModule } from './Modules/Category/category.module';
import { MediaModule } from './Modules/Media/media.module';
import { Media } from './Modules/Media/entity/media.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'haianh123',
      database: 'project_nestjs2',
      entities: [User, Order, Product, OrderDetail, Category, Media],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    OrderModule,
    ProductsModule,
    OrderDetailsModule,
    CategoryModule,
    MediaModule,
  ],
})
export class AppModule {}
