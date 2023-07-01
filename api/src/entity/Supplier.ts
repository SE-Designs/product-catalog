import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplierProduct } from "./SupplierTransaction";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(
    () => SupplierProduct,
    (supplierProduct) => supplierProduct.supplier,
    { nullable: true }
  )
  supplierProducts: SupplierProduct[];
}
