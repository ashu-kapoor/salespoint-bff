import type {
  AddCustomerInput,
  Customer,
  Resolvers,
  SearchCustomerInput,
} from "../generated/schematypes.js";
import _ from "lodash";

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
    customer: async (_parent, { id }) => {
      const record: Customer = _.find(customer, { id: id as any });
      return record;
    },
    customers: async () => customer,
    searchCustomer: async (
      _parent,
      { input }: { input: SearchCustomerInput }
    ) => {
      const { fields, searchTerm, filter } = input;

      return customer;
    },
  },
  Mutation: {
    addCustomer: async (_parent, { input }: { input: AddCustomerInput }) =>
      customer[0],
    updateCustomer: async (
      _parent,
      id,
      { request }: { request: AddCustomerInput }
    ) => customer[1],
  },
};

export default customerResolvers;
