import CustomerService from "../client/CustomerService.js";
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
    customer: (_parent, { id }) =>  CustomerService.getInstance().getCustomerbyId(id as string),
    customers: async () => CustomerService.getInstance().getCustomerbyFilter({}),
    searchCustomer: async (
      _parent,
      { input }: { input: SearchCustomerInput }
    ) => CustomerService.getInstance().getCustomerbyFilter(input),
  },
  Mutation: {
    addCustomer: async (_parent, { input }: { input: AddCustomerInput }) => CustomerService.getInstance().addCustomer(input),
    updateCustomer: async (
      _parent,
      {id, request} : { id:string,request: AddCustomerInput }
    ) => CustomerService.getInstance().updateCustomer(id, request)
  },
};

export default customerResolvers;
