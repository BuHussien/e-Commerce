import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getTotalCartQntSelector } from "./cartSelectors";
import getProductsFullInfo from "./getProductsFullInfo";
import type { IFullProductCart } from "@customTypes/cart";
import type { TLoading } from "@customTypes/shared";
import actGetProductsFullInfo from "./getProductsFullInfo";
interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: IFullProductCart[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{id: number, qnt?: number}>) => {
      const id = action.payload.id;
      let qnt = action.payload.qnt;
      if(!qnt) qnt = 1

      if (state.items[id]) {
        state.items[id]+=qnt;
      } else {
        state.items[id] = qnt;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.productsFullInfo = state.productsFullInfo.filter(
        (item) => String(item.product.id) !== String(id),
      );
    },
    changeQnt: (state, action) => {
      const { id, amount } = action.payload;
      if (!state.items[id]) return;

      state.items[id] += amount;

      if (state.items[id] <= 0) {
        delete state.items[id];
        state.productsFullInfo = state.productsFullInfo.filter(
          (item) => String(item.product.id) !== String(id),
        );
        return;
      }
      const product = state.productsFullInfo.find(
        (item) => String(item.product.id) === String(id),
      );

      if (product) {
        product.qnt = state.items[id];
      }
    },
    cleanCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsFullInfo.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsFullInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsFullInfo.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export { getTotalCartQntSelector, getProductsFullInfo };
export const { addToCart, removeFromCart, changeQnt, cleanCartProductsFullInfo } = cartSlice.actions;
export default cartSlice.reducer;
