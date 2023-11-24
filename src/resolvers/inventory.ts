import InventoryService from "../client/InventoryService.js";
import type {
  Inventory,
  AddInventoryInput,
  SearchInventoryInput,
  Resolvers,
} from "../generated/schematypes.js";
import _ from "lodash";
import { MyContext, logger } from "../index.js";
import { SecurityRolesEnum } from "../security/SecurityRolesEnum.js";
import SecurityUtils from "../security/SecurityUtils.js";

const inventoryData: Inventory[] = [
  { id: "1", quantity: 12, productName: "Product 1", price: 22.4 },
  { id: "2", quantity: 18, productName: "Product 2", price: 30.4 },
  { id: "3", quantity: 24, productName: "Product 3", price: 40.4 },
];

const inventoryResolvers: Resolvers = {
  Query: {
    inventory: (_parent, { id }, contextValue: MyContext) => {
      /*let data = _.find(inventoryData, { id: id as any });
      if(data==undefined){
        return null;
      }
      return data;*/

      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);

      logger.info(
        `X-CorrelationId:${contextValue.correlationId} Getting inventory id:${id}`
      );
      return InventoryService.getInstance().getInventorybyId(
        id as string,
        contextValue.authorization,
        contextValue.correlationId
      );
    },
    inventories: async (contextValue: MyContext) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);

      logger.info(
        `X-CorrelationId:${contextValue.correlationId} Getting inventories`
      );
      return InventoryService.getInstance().getInventorybyFilter(
        {},
        contextValue.authorization,
        contextValue.correlationId
      );
    },
    searchInventory: async (
      _parent,
      { input }: { input: SearchInventoryInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);

      logger.info(
        `X-CorrelationId:${contextValue.correlationId} Getting inventory by criteria`
      );
      return InventoryService.getInstance().getInventorybyFilter(
        input,
        contextValue.authorization,
        contextValue.correlationId
      );
    },
  },
  Mutation: {
    addInventory: async (
      _parent,
      { input }: { input: AddInventoryInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);

      logger.info(
        `X-CorrelationId:${contextValue.correlationId} Adding Inventory Item`
      );
      return InventoryService.getInstance().addInventory(
        input,
        contextValue.authorization,
        contextValue.correlationId
      );
    },
    updateInventory: async (
      _parent,
      { id, request }: { id: string; request: AddInventoryInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);

      logger.info(
        `X-CorrelationId:${contextValue.correlationId} Updating inventory id:${id}`
      );
      return InventoryService.getInstance().updateInventory(
        id,
        request,
        contextValue.authorization,
        contextValue.correlationId
      );
    },
  },
};

export default inventoryResolvers;
