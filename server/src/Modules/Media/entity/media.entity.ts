import { Product } from 'src/Modules/Product/entity/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'media',
})
export class Media {
  @PrimaryGeneratedColumn({ type: 'int' })
  media_id: number;

  @ManyToOne(() => Product, (Product) => Product.orderDetail)
  @JoinColumn({ name: 'product_id' })
  product: number;

  @Column({ type: 'varchar', length: 45 })
  name: number;

  @Column({ type: 'varchar', length: 45 })
  type: number;

  @Column({ type: 'longtext' })
  source: string;
}
