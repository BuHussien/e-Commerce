import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actUpdateProduct = createAsyncThunk(
  "products/actUpdateProduct",
  async (product: TProduct, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axiosInstance.put<TProduct>(
        `/products/${product.id}`,
        product,
        { signal },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actUpdateProduct;
