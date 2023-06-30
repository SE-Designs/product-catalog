import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Subcategory } from "./Subcategory";
import { Uom } from "./Uom";
import { SupplierProduct } from "./SupplierTransaction";
import {
  InventoryTransaction,
  inventoryTransactions,
} from "./InventoryTransaction";
import { WarehouseStock } from "./WarehouseStock";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  category: Category;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @ManyToOne(() => Uom, (uom) => uom.products, { nullable: false })
  uom: Uom;
  subcategory: any;

  @OneToMany(
    () => SupplierProduct,
    (supplierProduct) => supplierProduct.product
  )
  supplierProducts: SupplierProduct[];

  @OneToMany(() => WarehouseStock, (warehouseStock) => warehouseStock.product)
  warehouseStocks: WarehouseStock[];

  @OneToMany(
    () => InventoryTransaction,
    (inventoryTransactions) => inventoryTransactions.product
  )
  inventoryTransactions: InventoryTransaction[];
}
