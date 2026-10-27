import type { TOrder } from "@customTypes/order";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actGetOrders = createAsyncThunk<TOrder[],void,{ rejectValue: string }>("orders/actGetAllOrders", async (_, { rejectWithValue}) => {
    try {
    const response = await axiosInstance.get<TOrder[]>(
      `/orders`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actGetOrders;
