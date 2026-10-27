import { createSlice } from "@reduxjs/toolkit";
import getCategories from "./atc/actGetCategories";
import type { TLoading } from "@customTypes/shared";
import type { TCategory } from "@customTypes/category";
import actAddCategory from "./atc/actAddCategory";
import actUpdateCategory from "./atc/actUpdateCategory";
import actDeleteCategory from "./atc/actDeleteCategory";

interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error?: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    cleanUpCategoriesRecords: (state) => {
      state.records = [];
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
      else state.error = action.error.message || "An unknown error occurred";
    });
    // Add Product
    builder
      .addCase(actAddCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAddCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records.push(action.payload);
      })
      .addCase(actAddCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });

    // Update Product
    builder
      .addCase(actUpdateCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = state.records.map((el) =>
          el.id === action.payload.id ? action.payload : el,
        );
      })
      .addCase(actUpdateCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });

    // Delete Product
    builder
      .addCase(actDeleteCategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actDeleteCategory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = state.records.filter((el) => el.id !== action.payload);
      })
      .addCase(actDeleteCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message || "An unknown error occurred";
      });
  },
});

export const { cleanUpCategoriesRecords } = categoriesSlice.actions;
export { getCategories };
export default categoriesSlice.reducer;
