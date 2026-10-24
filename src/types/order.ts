import type { TProduct } from "./product";

export type TOrderItem = {
  id: number;
  userId: number;
  subTotal: number;
  items: TProduct[];
};