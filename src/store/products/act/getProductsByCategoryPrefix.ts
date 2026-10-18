import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import axios from "axios";

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
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data.message || error.message);
      else return rejectWithValue("An Unexpected Error");
    }
  },
);

export default actGetProductsByCategoryPrefix;
