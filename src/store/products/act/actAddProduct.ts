import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import secureAxiosInstance from "@services/secure-axios";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actAddProduct = createAsyncThunk(
  "products/actAddProduct",
  async (productData: Omit<TProduct, "id">, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await secureAxiosInstance.post<TProduct>(
        "/products",
        productData,
        { signal },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAddProduct;
