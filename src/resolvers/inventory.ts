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
    inventory: async (_parent, { id }) => {
      const record: Inventory = _.find(inventoryData, { id: id as any });
      return record;
    },
    inventories: async () => inventoryData,
    searchInventory: async (
      _parent,
      { input }: { input: SearchInventoryInput }
    ) => {
      const { fields, searchTerm, filter } = input;

      return inventoryData;
    },
  },
  Mutation: {
    addInventory: async (_parent, { input }: { input: AddInventoryInput }) =>
      inventoryData[0],
    updateInventory: async (
      _parent,
      id,
      { request }: { request: AddInventoryInput }
    ) => inventoryData[1],
  },
};

export default inventoryResolvers;
