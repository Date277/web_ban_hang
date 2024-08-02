import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../Users/entity/users.entity';
import { OrderDetail } from 'src/Modules/OrderDetail/entity/orderDetails.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  order_id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  order_name: string;

  @Column({ type: 'date' })
  created_at: Date;

  @Column({
    type: 'varchar',
    length: 25,
  })
  status: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  province: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  district: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  ward: string;

  @ManyToOne(() => User, (user) => user.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orderDetail: OrderDetail[];
}
