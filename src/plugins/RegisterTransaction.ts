import { makeExtendSchemaPlugin, gql } from "graphile-utils";
import { registerTransaction } from "../service/inventory";

const RegisterTransactionPlugin = makeExtendSchemaPlugin((_build) => {
  return {
    typeDefs: gql`
      input RegisterTransactionInput {
        type: InventoryTransactionTypeEnum!
        productId: Int!
        warehouseId: Int!
        quantity: Int!
      }

      type RegisterTransactionPayload {
        transactionId: Int
        productId: Int
        warehouseId: Int
        updatedQuantity: Int
      }

      extend type Mutation {
        registerTransaction(
          input: RegisterTransactionInput!
        ): RegisterTransactionPayload
      }
    `,
    resolvers: {
      Mutation: {
        registerTransaction: async (_query, args, _context, _resolveInfo) => {
          try {
            const { type, productId, warehouseId, quantity } = args.input;
            const InventoryTransaction = await registerTransaction(
              type,
              productId,
              warehouseId,
              quantity
            );
            return { ...InventoryTransaction };
          } catch (e) {
            console.error(e);
            throw e;
          }
        },
      },
    },
  };
});

export default RegisterTransactionPlugin;
