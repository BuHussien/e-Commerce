import type { TProduct } from "./product";

export interface ICartItem {
  itemId: number;
  qnt: number;
}

export interface IFullProductCart {
  product: TProduct;
  qnt: number;
}
