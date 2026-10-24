import type { TOrderItem } from "@customTypes/order";
import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import type { RootState } from "@store/index";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export const actGetOrders = createAsyncThunk<TOrderItem[],void,{ rejectValue: string }>("orders/actGetOrders", async (_, { rejectWithValue, getState }) => {
  
    try {
    const { auth } = getState() as RootState;
    const response = await axiosInstance.get<TOrderItem[]>(
      `/orders?userId=${auth.user?.id}`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actGetOrders;

const getTotalOrdersQntSelector = createSelector(
  [(state: RootState) => state.wishlist.itemsIds],
  (items) => items.length,
);

export { getTotalOrdersQntSelector };
