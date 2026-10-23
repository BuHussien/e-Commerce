import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";
import type { TLoginForm, TLoginResponse } from "@customTypes/auth";

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TLoginForm, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const response = await axiosInstance.post<TLoginResponse>("/login", formData);
      return response;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAuthLogin;
