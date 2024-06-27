import { Order } from "./order";

export interface AllOrderResponse {
  orders: Order[];
  pagination: AllOrderPagination;
}

export interface AllOrderPagination {
  totalOrders: number;
  page: number;
  totalPages: number;
  limit: number;
}
