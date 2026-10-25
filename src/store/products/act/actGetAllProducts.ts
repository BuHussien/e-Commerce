import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actGetAllProducts = createAsyncThunk(
  "products/actGetAllProducts",
  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axiosInstance.get<TProduct[]>("/products",{signal});

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetAllProducts;


