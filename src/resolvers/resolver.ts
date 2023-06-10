import type { Resolvers } from "../generated/schematypes.js";
import inventoryResolvers from "./inventory.js";
import customerResolvers from "./customer.js";
import salesResolvers from "./sales.js";

const resolvers: Resolvers = {
  Query: {
    ...inventoryResolvers.Query,
    ...customerResolvers.Query,
    ...salesResolvers.Query,
  },
  Mutation: {
    ...inventoryResolvers.Mutation,
    ...customerResolvers.Mutation,
    ...salesResolvers.Mutation,
  },
};

export default resolvers;
