import { createSlice } from "@reduxjs/toolkit";
import getCategories from "./atc/getCategories";
import type { TLoading } from "@customTypes/shared";
import type { TCategory } from "@customTypes/category";



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
    cleanUpCategoriesRecords: (state)=>{
      state.records = [];
      state.loading = "idle";
    }
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
      else
        state.error = action.error.message || "An unknown error occurred";

    });
  },
});

export const {cleanUpCategoriesRecords} = categoriesSlice.actions;
export { getCategories };
export default categoriesSlice.reducer;
