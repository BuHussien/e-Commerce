
import type { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import secureAxiosInstance from "@services/secure-axios";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actAddCategory = createAsyncThunk(
  "categories/actAddCategory",
  async (categoryData: Omit<TCategory, "id">, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await secureAxiosInstance.post<TCategory>("/categories",categoryData,{ signal });

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAddCategory;
