import type { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import secureAxiosInstance from "@services/secure-axios";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actUpdateCategory = createAsyncThunk(
  "categories/actUpdateCategory",
  async (category: TCategory, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await secureAxiosInstance.put<TCategory>(
        `/categories/${category.id}`,
        category,
        { signal },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actUpdateCategory;
