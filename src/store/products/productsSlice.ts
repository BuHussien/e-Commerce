import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCategoryPrefix from "./act/actGetProductsByCategoryPrefix";
import type { TLoading } from "@customTypes/shared";
import type { TProduct } from "@customTypes/product";
import actGetAllProducts from "./act/actGetAllProducts";
import actGetSingleProduct from "./act/actGetSingleProduct";
import actUpdateProduct from "./act/actUpdateProduct";
import actAddProduct from "./act/actAddProduct";
import actDeleteProduct from "./act/actDeleteProduct";

interface IProductsState {
  records: TProduct[];
  record: TProduct | null;
  loading: TLoading;
  error?: string | null;
}

const initialState: IProductsState = {
  records: [],
  record: null,
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    cleanUpProductsRecords: (state) => {
      state.records = [];
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCategoryPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(
      actGetProductsByCategoryPrefix.fulfilled,
      (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload;
      },
    );

    builder.addCase(
      actGetProductsByCategoryPrefix.rejected,
      (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
        else state.error = action.error.message || "An unknown error occurred";
      },
    );
    // All Products
    builder
      .addCase(actGetAllProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetAllProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.records = action.payload;
      })
      .addCase(actGetAllProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });
    builder
      .addCase(actGetSingleProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetSingleProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.record = action.payload;
      })
      .addCase(actGetSingleProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });
      // Add Product
    builder
      .addCase(actAddProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAddProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records.push(action.payload);
      })
      .addCase(actAddProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });

    // Update Product
    builder
      .addCase(actUpdateProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = state.records.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
      })
      .addCase(actUpdateProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });

    // Delete Product
    builder
      .addCase(actDeleteProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actDeleteProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = state.records.filter((el) => el.id !== action.payload);
      })
      .addCase(actDeleteProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });
  },
});

export const { cleanUpProductsRecords } = productsSlice.actions;
export { actGetProductsByCategoryPrefix };
export default productsSlice.reducer;
