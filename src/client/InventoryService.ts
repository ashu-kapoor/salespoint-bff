import {
  AddInventoryInput,
  Inventory,
  SearchInventoryInput,
} from "../generated/schematypes.js";
import ConnectionFactory from "./ConnectionFacade.js";

export default class InventoryService {
  private static instance: InventoryService;
  private connectionFactory: ConnectionFactory;
  private constructor() {
    this.connectionFactory = ConnectionFactory.getInstance();
  }
  public static getInstance(): InventoryService {
    if (!InventoryService.instance) {
      InventoryService.instance = new InventoryService();
    }
    return InventoryService.instance;
  }

  public async getInventorybyId(id: string): Promise<Inventory> {
    return this.connectionFactory
      .getData<Inventory, Inventory>(
        `${process.env.SEARCH_BASE_URL}/search/inventory/${id}`,
        undefined,
        undefined,
        undefined
      )
      .then((a) => a.data);
  }

  public async getInventorybyFilter(
    input: SearchInventoryInput
  ): Promise<Inventory[]> {
    const { searchTerm, fields, filter } = input;
    const filterToPass = filter ?? undefined;
    let data: SearchInventoryInput | undefined = undefined;

    if (searchTerm !== undefined && fields !== undefined) {
      data = { searchTerm, fields };
    }

    return this.connectionFactory
      .getData<SearchInventoryInput, Inventory[]>(
        `${process.env.SEARCH_BASE_URL}/search/inventory`,
        filterToPass === undefined ? undefined : { filter: filterToPass },
        data,
        undefined
      )
      .then((a) => a.data);
  }

  public async addInventory(input: AddInventoryInput): Promise<Inventory> {
    return this.connectionFactory
      .postData<AddInventoryInput, Inventory>(
        `${process.env.INVENTORY_BASE_URL}/inventories`,
        undefined,
        input,
        undefined
      )
      .then((a) => a.data);
  }

  public async updateInventory(
    id: string,
    input: AddInventoryInput
  ): Promise<Inventory> {
    return this.connectionFactory
      .putData<AddInventoryInput, Inventory>(
        `${process.env.INVENTORY_BASE_URL}/inventory/items/${id}`,
        undefined,
        input,
        undefined
      )
      .then((a) => a.data);
  }
}
