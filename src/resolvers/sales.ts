import SalesService from "../client/SalesService.js";
import type {
  AddSalesInput,
  Resolvers,
  Sales,
  SearchSalesInput,
} from "../generated/schematypes.js";
import _ from "lodash";
import { MyContext } from "../index.js";
import { SecurityRolesEnum } from "../security/SecurityRolesEnum.js";
import SecurityUtils from "../security/SecurityUtils.js";

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
    sale: async (_parent, { id }, contextValue: MyContext) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return SalesService.getInstance().getSalesById(
        id as string,
        contextValue.authorization
      );
    },
    searchSales: async (
      _parent,
      { input }: { input: SearchSalesInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return SalesService.getInstance().getSalesByFilter(
        input,
        contextValue.authorization
      );
    },
  },
  Mutation: {
    createSales: async (
      _parent,
      { input }: { input: AddSalesInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return SalesService.getInstance().createSales(
        input,
        contextValue.authorization
      );
    },
  },
};

export default salesResolvers;
