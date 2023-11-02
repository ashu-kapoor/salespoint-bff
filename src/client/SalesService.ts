import {
  AddSalesInput,
  Sales,
  SalesResponse,
  SearchSalesInput,
} from "../generated/schematypes.js";
import ConnectionFactory from "./ConnectionFacade.js";

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

  public async getSalesById(id: string): Promise<Sales> {
    return this.connectionFactory
      .getData<Sales, Sales>(
        `${process.env.SEARCH_BASE_URL}/search/sales/${id}`,
        undefined,
        undefined,
        undefined
      )
      .then((a) => a.data);
  }

  public async getSalesByFilter(input: SearchSalesInput): Promise<Sales[]> {
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
        undefined
      )
      .then((a) => a.data);
  }

  public async createSales(input: AddSalesInput): Promise<SalesResponse> {
    return this.connectionFactory
      .postData<AddSalesInput, SalesResponse>(
        `${process.env.SALES_BASE_URL}/sales`,
        undefined,
        input,
        undefined
      )
      .then((a) => a.data);
  }
}
