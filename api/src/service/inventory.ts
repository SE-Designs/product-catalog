import AppDataSource from "../data-source";
import {
  InventoryTransaction,
  TransactionType,
} from "../entity/InventoryTransaction";
import { Product } from "../entity/Product";
import { Warehouse } from "../entity/Warehouse";
import { WarehouseStock } from "../entity/WarehouseStock";

const productRepository = AppDataSource.getRepository(Product);
const warehouseRepository = AppDataSource.getRepository(Warehouse);
const warehouseStockRepository = AppDataSource.getRepository(WarehouseStock);

export type TransactionDetails = {
  transactionId: number;
  productId: number;
  warehouseId: number;
  updatedQuantity: number;
};

export const registerTransaction = async (
  type: TransactionType,
  productId: number,
  warehouseId: number,
  quantity: number
): Promise<TransactionDetails> => {
  const product = await productRepository.findOneByOrFail({ id: productId });
  const warehouse = await warehouseRepository.findOneByOrFail({
    id: warehouseId,
  });

  const transaction = new InventoryTransaction();
  transaction.date = new Date();
  transaction.quantity = quantity;
  transaction.type = type;
  transaction.product = product;
  transaction.warehouse = warehouse;

  const warehouseStock =
    (await warehouseStockRepository.findOneBy({
      productId: product.id,
      warehouseId: warehouse.id,
    })) || new WarehouseStock();

  if (!warehouseStock.productId || !warehouseStock.warehouseId) {
    warehouseStock.productId = product.id;
    warehouseStock.warehouseId = warehouse.id;
    warehouseStock.quantity = 0;
  }

  warehouseStock.quantity =
    warehouseStock.quantity +
    (type === TransactionType.RECEIVE ? quantity : -quantity);

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.save(transaction);
    await transactionalEntityManager.save(warehouseStock);
  });

  return {
    transactionId: transaction.id,
    updatedQuantity: warehouseStock.quantity,
    warehouseId: warehouse.id,
    productId: product.id,
  };
};
