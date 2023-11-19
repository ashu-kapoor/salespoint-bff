import CustomerService from "../client/CustomerService.js";
import type {
  AddCustomerInput,
  Customer,
  Resolvers,
  SearchCustomerInput,
} from "../generated/schematypes.js";
import _ from "lodash";
import { MyContext } from "../index.js";
import { SecurityRolesEnum } from "../security/SecurityRolesEnum.js";
import { GraphQLError } from "graphql";
import SecurityUtils from "../security/SecurityUtils.js";

const customer: Customer[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    amount: 24.5,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    amount: 50.5,
  },
];

const customerResolvers: Resolvers = {
  Query: {
    customer: (_parent, { id }, contextValue: MyContext) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return CustomerService.getInstance().getCustomerbyId(
        id as string,
        contextValue.authorization
      );
    },
    customers: async (_parent, contextValue: MyContext) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return CustomerService.getInstance().getCustomerbyFilter(
        {},
        contextValue.authorization
      );
    },
    searchCustomer: async (
      _parent,
      { input }: { input: SearchCustomerInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.OrderOnlyRole,
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return CustomerService.getInstance().getCustomerbyFilter(
        input,
        contextValue.authorization
      );
    },
  },
  Mutation: {
    addCustomer: async (
      _parent,
      { input }: { input: AddCustomerInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return CustomerService.getInstance().addCustomer(
        input,
        contextValue.authorization
      );
    },
    updateCustomer: async (
      _parent,
      { id, request }: { id: string; request: AddCustomerInput },
      contextValue: MyContext
    ) => {
      SecurityUtils.validateRole(contextValue.role, [
        SecurityRolesEnum.SalesPoint_AdminRole,
      ]);
      return CustomerService.getInstance().updateCustomer(
        id,
        request,
        contextValue.authorization
      );
    },
  },
};

export default customerResolvers;
