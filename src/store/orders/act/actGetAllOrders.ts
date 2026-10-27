import type { TOrder } from "@customTypes/order";
import { createAsyncThunk } from "@reduxjs/toolkit";
import secureAxiosInstance from "@services/secure-axios";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actGetOrders = createAsyncThunk<TOrder[],void,{ rejectValue: string }>("orders/actGetAllOrders", async (_, { rejectWithValue}) => {
    try {
    const response = await secureAxiosInstance.get<TOrder[]>(
      `/orders`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actGetOrders;
