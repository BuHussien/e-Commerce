import type { TProduct } from "./product";

export type TLoading = "idle" | "pending" | "succeeded" | "failed";

export interface ICartItem {
  itemId: number;
  qnt: number;
}

export interface IFullProductCart {
  product: TProduct;
  qnt: number;
}
