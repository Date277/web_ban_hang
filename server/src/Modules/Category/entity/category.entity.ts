import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../Product/entity/products.entity';

@Entity({ name: 'category', })
    
export class Category {
  @PrimaryGeneratedColumn({ type: 'int' })
  category_id: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', length: 100 })
    name: string;
     
  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product[];
}
