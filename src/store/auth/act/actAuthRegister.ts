import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";
import type { TRegisterForm } from "@customTypes/auth"

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TRegisterForm, ThunkAPI) => {
    const {rejectWithValue} = ThunkAPI;
    try{
        const response = await axiosInstance.post('/register',formData);
        return response.data;
    }catch(error){
        return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAuthRegister;
