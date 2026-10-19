import { createSlice } from "@reduxjs/toolkit";
import { getTotalCartQntSelector } from "./cartSelectors";
import getProductsFullInfo from "./getProductsFullInfo";
import type { IFullProductCart, TLoading } from "@customTypes/shared";
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
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(actGetProductsFullInfo.pending,(state)=>{
      state.loading = "pending";
      state.error = null;
    })
    builder.addCase(actGetProductsFullInfo.fulfilled,(state, action)=>{
      state.loading = "succeeded";
      state.error = null;
      state.productsFullInfo = action.payload;
    })
    builder.addCase(actGetProductsFullInfo.rejected,(state, action)=>{
      state.loading = "failed";
      if(action.payload && typeof action.payload === "string"){
        state.error = action.payload;
      }
    })
  }
});

export {getTotalCartQntSelector, getProductsFullInfo};
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
