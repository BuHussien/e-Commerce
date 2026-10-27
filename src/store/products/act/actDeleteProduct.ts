import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actDeleteProduct = createAsyncThunk(
  "products/actDeleteProduct",
  async (productId: number | string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      await axiosInstance.delete(`/products/${productId}`, { signal });
      return productId;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actDeleteProduct;
