import InventoryService from "../client/InventoryService.js";
import type {
  Inventory,
  AddInventoryInput,
  SearchInventoryInput,
  Resolvers,
} from "../generated/schematypes.js";
import _ from "lodash";

const inventoryData: Inventory[] = [
  { id: "1", quantity: 12, productName: "Product 1", price: 22.4 },
  { id: "2", quantity: 18, productName: "Product 2", price: 30.4 },
  { id: "3", quantity: 24, productName: "Product 3", price: 40.4 },
];

const inventoryResolvers: Resolvers = {
  Query: {
    inventory: (_parent, { id }) => {
      /*let data = _.find(inventoryData, { id: id as any });
      if(data==undefined){
        return null;
      }
      return data;*/
      return InventoryService.getInstance().getInventorybyId(id as string);
    },
    inventories: async () => InventoryService.getInstance().getInventorybyFilter({}),
    searchInventory: async (
      _parent,
      { input }: { input: SearchInventoryInput }
    ) => InventoryService.getInstance().getInventorybyFilter(input),
  },
  Mutation: {
    addInventory: async (_parent, { input }: { input: AddInventoryInput }) => InventoryService.getInstance().addInventory(input),
    updateInventory: async (
      _parent,
      {id, request} : { id:string,request: AddInventoryInput }
    ) => InventoryService.getInstance().updateInventory(id ,request)
  },
};

export default inventoryResolvers;
