import { Order } from 'src/Modules/Order/entity/order.entity';
import { Product } from 'src/Modules/Product/entity/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order_detail',
})
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: 'int' })
  order_detail_id: number;

  @Column({ type: 'int' })
  order_id: number;

  @Column({ type: 'varchar', length: 255 })
  number: number;

  @ManyToOne(() => Product, (Product) => Product.orderDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (Order) => Order.orderDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
