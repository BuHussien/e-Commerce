import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import axios from "axios";

export const actGetAllProducts = createAsyncThunk(
  "products/actGetAllProducts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axiosInstance.get<TProduct[]>("/products");
      console.log(response.data);
      console.log("Is Array:", Array.isArray(response.data));
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data.message || error.message);
      else return rejectWithValue("An Unexpected Error");
    }
  },
);

export default actGetAllProducts;
