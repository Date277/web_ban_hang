import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from '../../OrderDetail/entity/orderDetails.entity';
import { Category } from 'src/Modules/Category/entity/category.entity';
import { Media } from 'src/Modules/Media/entity/media.entity';

@Entity({
  name: 'product',
})
export class Product {
  @PrimaryGeneratedColumn({ type: 'int' })
  product_id: number;

  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  number: number;

  @Column({ type: 'double' })
  sale: number;

  @Column({ type: 'text', nullable: true })
  img: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail[];

  @OneToMany(() => Media, (media) => media.product)
  media: Media[];
}
