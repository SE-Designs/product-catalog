import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  // Subcategory has many products
  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];

  // Subcategory has one Category
  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  category: Category;
}
