import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";

import type { RootState } from "..";
import type { TProduct } from "@customTypes/product";
import type { IFullProductCart } from "@customTypes/shared";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

type TResponse = TProduct[];
const actGetProductsFullInfo = createAsyncThunk< IFullProductCart[], void, { state: RootState; rejectValue: string }
  >("cart/actGetProductsFullInfo", async (_, { rejectWithValue, getState }) => {
  const { cart } = getState() as RootState;
  const itemsId = Object.keys(cart.items);

  if (itemsId.length === 0) return [];

  try {
    const concatinatedIds = itemsId.map((el) => `id=${el}`).join("&");
    const response = await axiosInstance.get<TResponse>(
      `products?${concatinatedIds}`,
    );
    return response.data.map((product) => ({
      product,
      qnt: cart.items[String(product.id)] ?? 0,
    }));
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actGetProductsFullInfo;
