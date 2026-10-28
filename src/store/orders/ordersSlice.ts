import type { TOrder, TOrderItem } from "@customTypes/order";
import type { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";
import actGetAllOrders from "./act/actGetAllOrders";

interface IOrderState {
  orderList: TOrder[];
  allOrders?: TOrder[];
  loading: TLoading;
  error: string | null;
}
const initialState: IOrderState = {
  orderList: [],
  allOrders: [],
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.error = null;
      state.loading = "idle";
      state.orderList = [];
      state.allOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actPlaceOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actPlaceOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.orderList = action.payload;
      })
      .addCase(actPlaceOrder.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
        else state.error = action.error.message || "An unknown error occurred";
      });

    builder
      .addCase(actGetOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetOrders.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.orderList = action.payload;
      })
      .addCase(actGetOrders.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
        else state.error = action.error.message || "An unknown error occurred";
      });
    // For admin

    builder
      .addCase(actGetAllOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetAllOrders.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.allOrders = action.payload;
      })
      .addCase(actGetAllOrders.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
        else state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default ordersSlice.reducer;
export const { clearOrders } = ordersSlice.actions;
