import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/likeToggle";
import type { TLoading } from "@customTypes/shared";
import actGetWishlists from "./act/actGetWishlist";
import { logout } from "@store/auth/authSlice";

interface IWishlist {
  itemsIds: number[];
  loading: TLoading;
  error: string | null;
}

const initialState: IWishlist = {
  itemsIds: [],
  loading: "idle",
  error: null,
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.itemsIds = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      const { type, id } = action.payload;

      if (type === "add") {
        state.itemsIds.push(id);
      } else {
        state.itemsIds = state.itemsIds.filter((item) => item !== id);
      }

      state.loading = "idle";
      state.error = null;
    });

    builder.addCase(actLikeToggle.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
      else state.error = action.error.message || "An unknown error occurred";
    });

    builder.addCase(actGetWishlists.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlists.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.itemsIds = action.payload;
    });
    builder.addCase(actGetWishlists.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(logout, state => {
      state.itemsIds = [],
      state.error = null,
      state.loading = "idle"
    });
  },
});

export default wishlistSlice.reducer;
export { actLikeToggle };
export const { clearWishlist } = wishlistSlice.actions;
