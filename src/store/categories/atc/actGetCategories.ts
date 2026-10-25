import type { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actGetCategories = createAsyncThunk(
  "Categories/getCategories",
  async (_, thunkApi) => {
    const { rejectWithValue,signal } = thunkApi;
    try {
      const response = await axiosInstance.get<TCategory[]>("/categories",{signal});
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetCategories;
