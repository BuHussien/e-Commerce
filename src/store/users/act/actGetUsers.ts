import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";
import type { TUser } from "@customTypes/user";

const actGetUsers = createAsyncThunk(
  "users/actGetUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const response = await axiosInstance.get<TUser[]>("/users", {
        signal,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetUsers;