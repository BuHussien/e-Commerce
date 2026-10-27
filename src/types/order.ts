import type { TProduct } from "./product";

export type TOrderItem = {
  id: number;
  title: string;
  price: string;
  img: string;
  qnt: number;
};

export type TOrder = {
  id: number;
  userId: number;
  items: TOrderItem[];
  shipping: number;
  subTotal: number;
  total: number;
};
