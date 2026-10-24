import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";
import { type RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async ({subTotal, shipping}:{subTotal: number; shipping: number}, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;
    const { auth, cart } = getState() as RootState;
    const orderItems = cart.productsFullInfo.map((el) => ({
      id: el.product.id,
      title: el.product.title,
      price: el.product.price,
      img: el.product.img,
      qnt: el.qnt
    }));

    try {
      const response = await axiosInstance.post("/orders", {
        userId: auth.user?.id,
        items: orderItems,
        shipping,
        subTotal,
        total: shipping + subTotal
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actPlaceOrder;
