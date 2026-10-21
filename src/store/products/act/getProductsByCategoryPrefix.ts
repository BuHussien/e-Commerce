import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actGetProductsByCategoryPrefix = createAsyncThunk(
  "products/actGetProductsByCategoryPrefix",
  async (prefix: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axiosInstance.get<TProduct[]>(
        `/products?cat_prefix=${prefix}`,
      );
      return response.data;
    } catch (error) {
     return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetProductsByCategoryPrefix;
