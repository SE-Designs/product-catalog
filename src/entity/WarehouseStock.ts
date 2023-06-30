import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product";
import { Warehouse } from "./Warehouse";

@Entity()
export class WarehouseStock {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  warehouseId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.warehouseStocks, {
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseStocks, {
    nullable: false,
  })
  warehouse: Warehouse;
}
