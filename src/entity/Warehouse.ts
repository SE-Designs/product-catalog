import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InventoryTransaction } from "./InventoryTransaction";
import { WarehouseStock } from "./WarehouseStock";

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => WarehouseStock, (warehouseStock) => warehouseStock.product)
  warehouseStocks: WarehouseStock[];

  @OneToMany(
    () => InventoryTransaction,
    (inventoryTransactions) => inventoryTransactions.warehouse
  )
  inventoryTransactions: InventoryTransaction[];
}
