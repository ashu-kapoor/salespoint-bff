import InventoryService from "../client/InventoryService.js";
import type {
  Inventory,
  AddInventoryInput,
  SearchInventoryInput,
  Resolvers,
} from "../generated/schematypes.js";
import _ from "lodash";
import { MyContext } from "../index.js";
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
      return InventoryService.getInstance().getInventorybyId(
        id as string,
        contextValue.authorization
      );
    },
    inventories: async (contextValue: MyContext) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return InventoryService.getInstance().getInventorybyFilter(
        {},
        contextValue.authorization
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
      return InventoryService.getInstance().getInventorybyFilter(
        input,
        contextValue.authorization
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
      return InventoryService.getInstance().addInventory(
        input,
        contextValue.authorization
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
      return InventoryService.getInstance().updateInventory(
        id,
        request,
        contextValue.authorization
      );
    },
  },
};

export default inventoryResolvers;
