import { createAsyncThunk } from "@reduxjs/toolkit";
import secureAxiosInstance from "@services/secure-axios";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actDeleteCategory = createAsyncThunk(
  "categories/actDeleteCategory",
  async (categoryId: number | string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      await secureAxiosInstance.delete(`/categories/${categoryId}`, { signal });
      return categoryId;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actDeleteCategory;
