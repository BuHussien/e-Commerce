import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actGetAllProducts = createAsyncThunk(
  "products/actGetAllProducts",
  async ({ page = 1, limit = 5 }: { page?: number; limit?: number }, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axiosInstance.get<TProduct[]>("/products", {
        params: {
          _page: page,
          _limit: limit,
        },
        signal,
      });
      const totalItems = response.headers["x-total-count"] ? Number(response.headers["x-total-count"]) : response.data.length;
      return { records: response.data, totalItems };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetAllProducts;
