import { AddCustomerInput, Customer, SearchCustomerInput } from "../generated/schematypes.js";
import ConnectionFactory from "./ConnectionFactory.js";

export default class CustomerService {
  private static instance: CustomerService;
  private connectionFactory: ConnectionFactory;
  private constructor() {
    this.connectionFactory = ConnectionFactory.getInstance();
  }
  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  public async getCustomerbyId(id: string): Promise<Customer> {
    return await this.connectionFactory.getData<Customer, Customer>(
      `${process.env.SEARCH_BASE_URL}/search/customer/${id}`,
      undefined,
      undefined,
      undefined
    ).then(a=>a.data);
  }

  public async getCustomerbyFilter(
    input: SearchCustomerInput
  ): Promise<Customer[]> {
    const { searchTerm, fields, filter } = input;
    const filterToPass = filter ?? undefined;
    let data: SearchCustomerInput | undefined = undefined;

    if (searchTerm !== undefined && fields !== undefined) {
      data = { searchTerm, fields };
    }

    return this.connectionFactory
      .getData<SearchCustomerInput, Customer[]>(
        `${process.env.SEARCH_BASE_URL}/search/customer`,
        filterToPass === undefined ? undefined : { filter: filterToPass },
        data,
        undefined
      )
      .then((a) => {
        console.log(a);
        return a.data;
      });
  }


  public async addCustomer(input: AddCustomerInput): Promise<Customer> {

    return this.connectionFactory
          .postData<AddCustomerInput, Customer>(
              `${process.env.CUSTOMER_BASE_URL}/customers`,
              undefined,
              input,
              undefined
          ).then(a=>a.data);
      
  }

  public async updateCustomer(id:string, input: AddCustomerInput): Promise<Customer> {

    return this.connectionFactory
          .putData<AddCustomerInput, Customer>(
              `${process.env.CUSTOMER_BASE_URL}/customers/${id}`,
              undefined,
              input,
              undefined
          ).then(a=>a.data);
      
  }
}
