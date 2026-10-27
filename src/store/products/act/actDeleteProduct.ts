import { createAsyncThunk } from "@reduxjs/toolkit";
import secureAxiosInstance from "@services/secure-axios";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actDeleteProduct = createAsyncThunk(
  "products/actDeleteProduct",
  async (productId: number | string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      await secureAxiosInstance.delete(`/products/${productId}`, { signal });
      return productId;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actDeleteProduct;
