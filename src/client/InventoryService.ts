import axios from "axios";
import {
  AddInventoryInput,
  Inventory,
  SearchInventoryInput,
} from "../generated/schematypes.js";
import ConnectionFactory from "./ConnectionFacade.js";
import { logger } from "../index.js";

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

  public async getInventorybyId(
    id: string,
    auth: string,
    correlationId: string
  ): Promise<Inventory> {
    return this.connectionFactory
      .getData<Inventory, Inventory>(
        `${process.env.SEARCH_BASE_URL}/search/inventory/${id}`,
        undefined,
        undefined,
        { Authorization: auth, correlationId }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: getinventorybyId: Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: getinventorybyId: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }

  public async getInventorybyFilter(
    input: SearchInventoryInput,
    auth: string,
    correlationId: string
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
        { Authorization: auth, correlationId }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: getinventorybyFilter: Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: getinventorybyFilter: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }

  public async addInventory(
    input: AddInventoryInput,
    auth: string,
    correlationId: string
  ): Promise<Inventory> {
    return this.connectionFactory
      .postData<AddInventoryInput, Inventory>(
        `${process.env.INVENTORY_BASE_URL}/inventories`,
        undefined,
        input,
        { Authorization: auth, correlationId }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: addInventory Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: addInventory: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }

  public async updateInventory(
    id: string,
    input: AddInventoryInput,
    auth: string,
    correlationId: string
  ): Promise<Inventory> {
    return this.connectionFactory
      .putData<AddInventoryInput, Inventory>(
        `${process.env.INVENTORY_BASE_URL}/inventory/items/${id}`,
        undefined,
        input,
        { Authorization: auth, correlationId }
      )
      .then((a) => a.data)
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: updateInventory: Error occurred while fetching the data  code: ${e.code}, message: ${e.message}`
          );
        } else {
          logger.error(
            `X-CorrelationId:${correlationId} inventoryService: updateInventory: Error occurred while fetching the data ${e}`
          );
        }
        return e;
      });
  }
}
