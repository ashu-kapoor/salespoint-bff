import type {
  AddSalesInput,
  Resolvers,
  Sales,
  SearchSalesInput,
} from "../generated/schematypes.js";
import _ from "lodash";

const sales: Sales[] = [
  {
    id: "1",
    quantity: 12,
    productId: "Product 1",
    amount: 22.4,
    customerId: "1",
  },
  {
    id: "2",
    quantity: 18,
    productId: "Product 2",
    amount: 30.4,
    customerId: "2",
  },
  {
    id: "647c192dca81f56b3bba3aec",
    quantity: 3,
    customerId: "647c15c3529469407aa6010e",
    productId: "647c13a8fef39d5dfa0f9703",
    status: "SUCCESS",
    amount: 1,
    customer: {
      id: "647c15c3529469407aa6010e",
      firstName: "niharika",
      lastName: "kapoor",
      amount: 3,
      email: "nihu@test.io",
    },
    inventory: {
      id: "647c13a8fef39d5dfa0f9703",
      quantity: 6,
      productName: "Test Car",
      price: 22.4,
    },
    saga: {
      currentStep: 1,
      currentChannel: "CUSTOMER",

      steps: [
        {
          channel: "INVENTORY",
          stepInfo: {
            FORWARD: {
              command: "DEBIT_INVENTORY",
            },
            COMPENSATE: {
              command: "REVERT_INVENTORY",
            },
          },
          reason: "InventoryDebited",
          stepStage: "FORWARD",
          stepStatus: "SUCCESS",
        },
        {
          channel: "CUSTOMER",
          stepInfo: {
            FORWARD: {
              command: "DEBIT_CUSTOMER",
            },
          },
          reason: "Customer amount debited",
          stepStage: "FORWARD",
          stepStatus: "SUCCESS",
        },
      ],
    },
  },
];

const salesResolvers: Resolvers = {
  Query: {
    sale: async (_parent, { id }) => sales[0],
    searchSales: async (_parent, { input }: { input: SearchSalesInput }) => {
      const { fields, searchTerm, filter } = input;

      return sales;
    },
  },
  Mutation: {
    createSales: async (_parent, { input }: { input: AddSalesInput }) =>
      sales[0],
  },
};

export default salesResolvers;
