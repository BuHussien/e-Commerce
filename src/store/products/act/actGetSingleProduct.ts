import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";


export const actGetSingleProduct = createAsyncThunk(
  "products/actGetSingleProduct/:id",
  async (id, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axiosInstance.get<TProduct>(`/products/${id}`,{signal});

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetSingleProduct;