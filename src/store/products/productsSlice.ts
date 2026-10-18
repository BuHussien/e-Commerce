import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCategoryPrefix from "./act/getProductsByCategoryPrefix";
import type { TLoading } from "@customTypes/shared";
import type { TProduct } from "@customTypes/product";



interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error?: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    ProductsCleanUp: (state) =>{
      state.records = [];
      state.loading = "idle"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCategoryPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetProductsByCategoryPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });

    builder.addCase(actGetProductsByCategoryPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
      else
        state.error = action.error.message || "An unknown error occurred";

    });
  },
});

export const{ProductsCleanUp} = productsSlice.actions;
export { actGetProductsByCategoryPrefix };
export default productsSlice.reducer;
