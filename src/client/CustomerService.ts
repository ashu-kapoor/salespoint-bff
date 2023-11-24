import axios from "axios";
import {
  AddCustomerInput,
  Customer,
  SearchCustomerInput,
} from "../generated/schematypes.js";
import { logger } from "../index.js";
import ConnectionFactory from "./ConnectionFacade.js";

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

  public async getCustomerbyId(
    id: string,
    auth: string,
    correlationId: string
  ): Promise<Customer> {
    return await this.connectionFactory
      .getData<Customer, Customer>(
        `${process.env.SEARCH_BASE_URL}/search/customer/${id}`,
        undefined,
        undefined,
        { Authorization: auth, correlationId }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: getCustomerbyId: Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: getCustomerbyId: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }

  public async getCustomerbyFilter(
    input: SearchCustomerInput,
    auth: string,
    correlationId: string
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
        { Authorization: auth, correlationId }
      )
      .then((a) => {
        return a.data;
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: getCustomerbyFilter: Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: getCustomerbyFilter: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }

  public async addCustomer(
    input: AddCustomerInput,
    auth: string,
    correlationId: string
  ): Promise<Customer> {
    return this.connectionFactory
      .postData<AddCustomerInput, Customer>(
        `${process.env.CUSTOMER_BASE_URL}/customers`,
        undefined,
        input,
        { Authorization: auth, correlationId }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: addCustomer: Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: addCustomer: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }

  public async updateCustomer(
    id: string,
    input: AddCustomerInput,
    auth: string,
    correlationId: string
  ): Promise<Customer> {
    return this.connectionFactory
      .putData<AddCustomerInput, Customer>(
        `${process.env.CUSTOMER_BASE_URL}/customers/${id}`,
        undefined,
        input,
        { Authorization: auth, correlationId }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: updateCustomer: Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} CustomerService: updateCustomer: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }
}
