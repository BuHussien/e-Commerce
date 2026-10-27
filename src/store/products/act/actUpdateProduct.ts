import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import secureAxiosInstance from "@services/secure-axios";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actUpdateProduct = createAsyncThunk(
  "products/actUpdateProduct",
  async (product: TProduct, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await secureAxiosInstance.put<TProduct>(
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
