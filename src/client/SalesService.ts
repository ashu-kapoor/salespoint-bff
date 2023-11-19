import axios from "axios";
import {
  AddSalesInput,
  Sales,
  SalesResponse,
  SearchSalesInput,
} from "../generated/schematypes.js";
import ConnectionFactory from "./ConnectionFacade.js";
import { logger } from "../index.js";

export default class SalesService {
  private static instance: SalesService;
  private connectionFactory: ConnectionFactory;
  private constructor() {
    this.connectionFactory = ConnectionFactory.getInstance();
  }
  public static getInstance(): SalesService {
    if (!SalesService.instance) {
      SalesService.instance = new SalesService();
    }
    return SalesService.instance;
  }

  public async getSalesById(id: string, auth: string): Promise<Sales> {
    return this.connectionFactory
      .getData<Sales, Sales>(
        `${process.env.SEARCH_BASE_URL}/search/sales/${id}`,
        undefined,
        undefined,
        { Authorization: auth }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            "salesService: getsalesById: Error occurred while fetching the data ",
            { code: e.code, message: e.message }
          );
        } else {
          logger.error(
            "salesService: getsalesbyId: Error occurred while fetching the data ",
            e
          );
        }
        return e;
      });
  }

  public async getSalesByFilter(
    input: SearchSalesInput,
    auth: string
  ): Promise<Sales[]> {
    const { searchTerm, fields, filter } = input;
    const filterToPass = filter ?? undefined;
    let data: SearchSalesInput | undefined = undefined;

    if (searchTerm !== undefined && fields !== undefined) {
      data = { searchTerm, fields };
    }

    return this.connectionFactory
      .getData<SearchSalesInput, Sales[]>(
        `${process.env.SEARCH_BASE_URL}/search/sales`,
        filterToPass === undefined ? undefined : { filter: filterToPass },
        data,
        { Authorization: auth }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            "salesService: getsalesbyFilter: Error occurred while fetching the data ",
            { code: e.code, message: e.message }
          );
        } else {
          logger.error(
            "salesService: getsalesbyFilter: Error occurred while fetching the data ",
            e
          );
        }
        return e;
      });
  }

  public async createSales(
    input: AddSalesInput,
    auth: string
  ): Promise<SalesResponse> {
    return this.connectionFactory
      .postData<AddSalesInput, SalesResponse>(
        `${process.env.SALES_BASE_URL}/sales`,
        undefined,
        input,
        { Authorization: auth }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            "salesService: createSales: Error occurred while fetching the data ",
            { code: e.code, message: e.message }
          );
        } else {
          logger.error(
            "salesService: createSales: Error occurred while fetching the data ",
            e
          );
        }
        return e;
      });
  }
}
