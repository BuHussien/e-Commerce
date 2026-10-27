import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actDeleteCategory = createAsyncThunk(
  "categories/actDeleteCategory",
  async (categoryId: number | string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      await axiosInstance.delete(`/categories/${categoryId}`, { signal });
      return categoryId;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actDeleteCategory;
