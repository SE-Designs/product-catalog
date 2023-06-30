import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Warehouse } from "./Warehouse";

export enum TransactionType {
  RECEIVE = "receive",
  WITHDRAW = "withdraw",
}

@Entity()
export class InventoryTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  quantity: number;

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventoryTransactions, {
    nullable: false,
  })
  warehouse: Warehouse;

  @ManyToOne(() => Product, (product) => product.inventoryTransactions, {
    nullable: false,
  })
  product: Product;
}
